import { getAuth } from "firebase/auth";
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink, Redirect } from "react-router-dom";
import { Button, Card, Container, Menu, Segment } from "semantic-ui-react";
import { app } from "../../app/config/firebase";
import TrialUserListItem from "./TrialUserListItem";

export default function TrialUserList() {
  const { error } = useSelector((state) => state.async);
  const [users, setUsers] = useState([]);
  const db = getFirestore(app);
  const auth = getAuth(app);
  const user = auth.currentUser;

  //トライアル申請者リスト取得
  useEffect(() => {
    try {
      const q = query(
        collection(db, "users"),
        where("trialRequestCompanyHostId", "array-contains", user.uid)
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

  //エラーが発生した場合はリダイレクト
  if (error) return <Redirect to='/error' />;

  return (
    <>
      <Segment.Group>
        <Segment
          textAlign='center'
          style={{ border: "none" }}
          attached='top'
          secondary
          inverted
          color='teal'
        >
          <h1>トライアル申請者リスト</h1>
        </Segment>
      </Segment.Group>

      <div className='ui two item menu'>
        <Button className='active item'>Editorials</Button>
        <Button className='item'>Editorials</Button>
      </div>

      <Card.Group itemsPerRow={3}>
        {users.map((user) => (
          <TrialUserListItem user={user} key={user.id} />
        ))}
      </Card.Group>
    </>
  );
}
