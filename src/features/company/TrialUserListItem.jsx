import { getAuth } from "firebase/auth";
import {
  arrayUnion,
  collection,
  doc,
  getDocs,
  getFirestore,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Card, Header, Image } from "semantic-ui-react";
import { app } from "../../app/config/firebase";

export default function TrialUserListItem({ users }) {
  //loading
  const [loading, setLoading] = useState(false);
  //自分の会社取得
  const [myCompany, setMyCompany] = useState([]);
  //firebase
  const db = getFirestore(app);
  const auth = getAuth(app);
  //ログインユーザー
  const currentUser = auth.currentUser;

  //自分の企業を取得
  useEffect(() => {
    try {
      const q = query(
        collection(db, "events"),
        where("hostUid", "==", currentUser.uid)
      );
      getDocs(q).then((querySnapshot) => {
        setMyCompany(
          querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))[0]
        );
        //コンソールで表示
        console.log(
          querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))[0].id
        );
      }, []);
    } catch (error) {
      console.log(error.message);
    }
  }, [db, currentUser]);

  console.log(myCompany.id);

  //トライラル申請者承認
  async function trialMatchCompanyToUser() {
    setLoading(true);
    try {
      await updateDoc(doc(db, "users", currentUser.uid), {
        MatchCompanyId: arrayUnion(myCompany.id),
        MatchCompanyHostId: arrayUnion(myCompany.hostUid),
      });
      return await updateDoc(doc(db, "events", myCompany.id), {
        MatchUserId: arrayUnion(currentUser.uid),
      });
    } catch (error) {
      console.log("fserror", error);
      throw error;
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card.Group itemsPerRow={3} style={{ marginTop: 30 }}>
      {users.map((user) => (
        <Card key={user.id}>
          <Card.Content>
            <Image size='large' src={user.photoURL} />
            <Header size='huge'>{user.displayName}</Header>
            <Button
              floated='right'
              negative
              content='トライアル承認'
              onClick={trialMatchCompanyToUser}
              loading={loading}
            />
            <Button
              floated='right'
              positive
              content='プロフィール'
              as={Link}
              to={`/profile/${user.userUid}`}
            />
          </Card.Content>
        </Card>
      ))}
    </Card.Group>
  );
}
