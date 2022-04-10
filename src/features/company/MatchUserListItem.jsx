import { getAuth } from "firebase/auth";
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { app } from "../../app/config/firebase";
import MatchUserListItemContent from "./MacthUserListItemContent";

export default function MatchUserListItem() {
  const [matchUsers, setMatchUsers] = useState([]);
  const db = getFirestore(app);
  const auth = getAuth(app);
  const currentUser = auth.currentUser;

  //マッチユーザーリスト取得
  useEffect(() => {
    try {
      const q = query(
        collection(db, "matchCompany", currentUser.uid, "users"),
        where("hostUid", "==", currentUser.uid)
      );
      getDocs(q).then((querySnapshot) => {
        setMatchUsers(querySnapshot.docs.map((doc) => doc.data()));

        //コンソールで表示
        console.log(querySnapshot.docs.map((doc) => doc.data()));
      });
    } catch (error) {
      console.log(error.message);
    }
  }, [db, currentUser.uid]);

  return (
    <>
      {matchUsers.map((matchUser) => (
        <MatchUserListItemContent
          key={matchUser.id}
          matchUser={matchUser}
          currentUser={currentUser}
        />
      ))}
    </>
  );
}
