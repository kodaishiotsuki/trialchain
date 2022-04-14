import { getAuth } from "firebase/auth";
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Card } from "semantic-ui-react";
import { app } from "../../app/config/firebase";
import MatchUserListItem from "./MatchUserListItem";


export default function MatchUserList() {
  //マッチしたユーザー
  const [matchUsers, setMatchUsers] = useState([]);
  //FB
  const db = getFirestore(app);
  const auth = getAuth(app);
  const currentUser = auth.currentUser;

  //マッチユーザーリスト取得
  useEffect(() => {
    try {
      const q = query(
        collection(db, "group"),
        where("attendeeIds", "array-contains", currentUser.uid)
      );
      getDocs(q).then((querySnapshot) => {
        setMatchUsers(querySnapshot.docs.map((doc) => doc.data()))

        //コンソールで表示
        console.log(querySnapshot.docs.map((doc) => doc.data()));
      });
    } catch (error) {
      console.log(error.message);
    }
  }, [db, currentUser?.uid]);

  return (
    <Card.Group itemsPerRow={3}>
      {matchUsers.map((matchUser) => (
        <MatchUserListItem
          key={matchUser.id}
          matchUser={matchUser}
          currentUser={currentUser}
        />
      ))}
    </Card.Group>
  );
}
