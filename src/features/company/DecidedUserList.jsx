import { getAuth } from "firebase/auth";
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Card, Segment } from "semantic-ui-react";
import { app } from "../../app/config/firebase";
import DecidedUserListItem from "./DecidedUserListItem";

export default function DecidedUserList() {
  //トライアル決定したユーザー
  const [decidedUsers, setDecidedUsers] = useState([]);
  //FB
  const db = getFirestore(app);
  const auth = getAuth(app);
  const currentUser = auth.currentUser;

  //マッチユーザーリスト取得
  useEffect(() => {
    try {
      const q = query(
        collection(db, "decidedCompany", currentUser?.uid, "users"),
        where("hostUid", "==", currentUser?.uid)
      );
      getDocs(q).then((querySnapshot) => {
        setDecidedUsers(querySnapshot.docs.map((doc) => doc.data()));

        //コンソールで表示
        console.log(querySnapshot.docs.map((doc) => doc.data()));
      });
    } catch (error) {
      console.log(error.message);
    }
  }, [db, currentUser?.uid]);

  return (
    <>
      <Segment
        textAlign='center'
        style={{ border: "none",  margin: "auto",marginBottom:20 }}
        attached='top'
        secondary
        inverted
        color='teal'
      >
        <h2>トライアル決定者リスト</h2>
      </Segment>
      <Card.Group itemsPerRow={3}>
        {decidedUsers.map((decidedUser) => (
          <DecidedUserListItem
            key={decidedUser.id}
            decidedUser={decidedUser}
            currentUser={currentUser}
          />
        ))}
      </Card.Group>
    </>
  );
}
