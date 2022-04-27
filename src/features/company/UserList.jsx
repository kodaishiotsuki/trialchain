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
import { Card, Segment } from "semantic-ui-react";

export default function UserList({ match, history, location }) {
  const { error } = useSelector((state) => state.async);
  const [users, setUsers] = useState([]);
  const db = getFirestore(app);

  //コレクションuser,サブコレクションcompanies取得
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
      <Segment
        textAlign='center'
        style={{ border: "none", width: 700, marginBottom: 20 }}
        // style={{ border: "none", margin: "auto", marginBottom: 20 }}
        attached='top'
        secondary
        inverted
        color='teal'
      >
        <h2>求職者リスト</h2>
      </Segment>
      <Card.Group itemsPerRow={3} style={{ width: 730 }}>
        {users.map((user) => (
          <UserListItem user={user} key={user.id} />
        ))}
      </Card.Group>
    </>
  );
}
