import { getAuth } from 'firebase/auth';
import { collection, getDocs, getFirestore, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { Icon } from 'semantic-ui-react';
import { app } from '../../../app/config/firebase';
import MatchMeetyCompanyListItem from './MatchMeetyCompanyListItem';

export default function MatchMeetyCompanyList() {
  //FB
  const db = getFirestore(app);
  const auth = getAuth(app);
  const currentUser = auth.currentUser;
  //マッチしたリスト
  const [meetyUsers, setMeetyUsers] = useState([]);

  //マッチしたリスト取得
  useEffect(() => {
    try {
      const q = query(
        collection(db, "meetyGroup"),
        where("seekerId", "==", currentUser.uid)
      );
      getDocs(q).then((querySnapshot) => {
        setMeetyUsers(
          querySnapshot.docs.map((doc) =>
            doc.data({ ...doc.data(), id: doc.id })
          )
        );
        console.log(querySnapshot.docs.map((doc) => doc.data()));
      });
    } catch (error) {
      console.log(error.message);
    }
  }, [db, currentUser.uid]);
  return (
    <>
      <div style={{ textAlign: "center", marginBottom: 20, display: "flex" }}>
        <Icon name='meetup' size='huge' color='teal' />
        <h1>マッチしたカジュアル面談リスト</h1>
      </div>
      {meetyUsers.map((meety) => (
        <MatchMeetyCompanyListItem key={meety.id} meety={meety} />
      ))}
    </>
  );
}
