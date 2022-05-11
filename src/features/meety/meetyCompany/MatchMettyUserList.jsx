import { getAuth } from 'firebase/auth';
import { collection, getDocs, getFirestore, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { Card,Icon } from 'semantic-ui-react';
import { app } from '../../../app/config/firebase';
import MatchMettyUserListItem from './MatchMettyUserListItem';

export default function MatchMettyUserList() {
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
        collection(db, "meetyGroup"),
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
  }, [db, currentUser?.uid]);

  return (
    <>
      <div style={{ textAlign: "center", marginBottom: 20, display: "flex" }}>
        <Icon name='meetup' size='huge' color='teal' />
        <h1>マッチしたカジュアル面談者リスト</h1>
      </div>
      <Card.Group itemsPerRow={4}>
        {matchUsers.map((matchUser) => (
          <MatchMettyUserListItem
            key={matchUser.id}
            matchUser={matchUser}
            currentUser={currentUser}
          />
        ))}
      </Card.Group>
    </>
  );
}
