import { getAuth } from "firebase/auth";
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Card, Header, Image } from "semantic-ui-react";
import { app } from "../../app/config/firebase";

export default function MatchUserListItem() {
  const [users, setUsers] = useState([]);
  const db = getFirestore(app);
  const auth = getAuth(app);
  const user = auth.currentUser;

  console.log(user.uid);
  //マッチユーザーリスト取得
  useEffect(() => {
    try {
      const q = query(
        collection(db, "match", user.uid, "company"),
        where("hostUid", "==", user.uid)
      );
      getDocs(q).then((querySnapshot) => {
        setUsers(querySnapshot.docs.map((doc) => doc.data()));

        //コンソールで表示
        console.log(querySnapshot.docs.map((doc) => doc.data()));
      });
    } catch (error) {
      console.log(error.message);
    }
  }, [db, user.uid]);

  return (
    <Card.Group itemsPerRow={3} style={{ marginTop: 30 }}>
      {users.map((user) => (
        <Card key={user.id}>
          <Card.Content>
            <Image size='large' src={user.userPhotoURL} />
            <Header size='huge'>{user.userName}</Header>
            <Button
              floated='right'
              negative
              content='カジュアル面談へ'
              // onClick={trialMatchCompanyToUser}
              // loading={loading}
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
