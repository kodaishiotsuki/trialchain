import React, { useEffect, useState } from "react";

import { app } from "../../app/config/firebase";
// FireStoreのAPI(この後の例では省略する)
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import UserListItem from "./UserListItem";
import { Card, Icon} from "semantic-ui-react";

export default function UserList({ match, history, location }) {
  const { error } = useSelector((state) => state.async);
  const [users, setUsers] = useState([]);
  const db = getFirestore(app);

  //コレクションusers取得
  useEffect(() => {
    try {
      const q = query(
        collection(db, "users"),
        where("userType", "==", "求職者")
      );
      getDocs(q).then((querySnapshot) => {
        setUsers(querySnapshot.docs.map((doc) => doc.data()));

        //コンソールで表示
        // console.log(querySnapshot.docs.map((doc) => doc.data()));
      });
    } catch (error) {
      console.log(error.message);
    }
  }, [db]);

  //エラーが発生した場合はリダイレクト
  if (error) return <Redirect to='/error' />;

  return (
    <>
      <div style={{ textAlign: "center", marginBottom: 20, display: "flex" }}>
        <Icon name='teal users' size='huge' />
        <h1>求職者リスト</h1>
      </div>
      <Card.Group itemsPerRow={3}>
        {users.map((user) => (
          <UserListItem user={user} key={user.id} />
        ))}
      </Card.Group>
    </>
  );
}
