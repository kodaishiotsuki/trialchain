import { getAuth } from "firebase/auth";
import {
  arrayRemove,
  collection,
  doc,
  getDocs,
  getFirestore,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Card, Image, Label } from "semantic-ui-react";
import { app } from "../../app/config/firebase";

export default function TrialListItem({ company }) {
  //FB
  const db = getFirestore(app);
  const auth = getAuth(app);
  const user = auth.currentUser;
  //loading
  const [loading, setLoading] = useState(false);
  //トライアル申請ボタン
  const [buttonClick, setButtonClick] = useState(false);
  const [users, setUsers] = useState("");

  console.log(users);

  //自分を取得
  useEffect(() => {
    try {
      const q = query(
        collection(db, "users"),
        where("email", "==", user?.email)
      );
      getDocs(q).then((querySnapshot) => {
        setUsers(
          querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))[0]
        );
        //コンソールで表示
        // console.log(
        //   querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))[0]
        // );
      });
    } catch (error) {
      console.log(error.message);
    }
  }, [db, user?.email]);

  //トライアル申請
  async function UserTrialRequestCompany() {
    setLoading(true);
    try {
      await setDoc(
        doc(db, "trialCompany", company.hostUid, "users", users.id),
        {
          ...company,
          userName: users.displayName,
          userPhotoURL: users.photoURL || "/assets/user.png",
          userId: users.id,
        }
      );
      await setDoc(
        doc(db, "trialUser", users.id, "companies", company.hostUid),
        {
          ...company,
          userName: users.displayName,
          userPhotoURL: users.photoURL || "/assets/user.png",
          userId: users.id,
        }
      );
      //お気に入り企業削除
      await updateDoc(doc(db, "events", company.id), {
        favoriteUserId: arrayRemove(users.id),
      });
    } catch (error) {
      console.log("fserror", error);
      throw error;
    } finally {
      setButtonClick(true);
      setLoading(false);
    }
  }

  return (
    <Card>
      <Card.Content>
        <Label
          style={{ top: "-5px", fontSize: 13 }}
          ribbon='left'
          color='orange'
          content={`トライアル期間：${company.trialMonth}ヶ月`}
        />
        <Image
          floated='right'
          size='small'
          src={`/assets/categoryImages/${company.category}.jpg`}
          style={{ width: 150 }}
        />
        <br />
        <br />
        <Card.Header content={company.title} style={{ margin: 5 }} />

        <Card.Meta content='一緒に働きたい人材' style={{ margin: 5 }} />
        <Card.Content className='ui tag label' content={company.career[0]} />
      </Card.Content>
      <Card.Content extra>
        <div className='ui two buttons'>
          <Button
            as={Link}
            to={`/events/${company.id}`}
            floated='right'
            content='詳細を見る'
          />
          <Button
            color='teal'
            floated='right'
            content={buttonClick ? "応募済み" : "応募する"}
            loading={loading}
            onClick={UserTrialRequestCompany}
            disabled={buttonClick}
          />
        </div>
      </Card.Content>
    </Card>
  );
}
