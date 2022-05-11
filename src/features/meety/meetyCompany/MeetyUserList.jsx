import { getAuth } from 'firebase/auth';
import { collection, getDocs, getFirestore, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Card, Icon } from 'semantic-ui-react';
import { app } from '../../../app/config/firebase';
import MeetyUserListItem from './MeetyUserListItem';

export default function MeetyUserList() {
  //エラー
  const { error } = useSelector((state) => state.async);
  //FB
  const db = getFirestore(app);
  const auth = getAuth(app);
  const currentUser = auth.currentUser;
  //カジュアル面談応募者リスト
  const [meetyUsers, setMeetyUsers] = useState([]);

  //カジュアル面談応募者リスト取得
  useEffect(() => {
    try {
      const q = query(
        collection(db, "meetyCompany", currentUser.uid, "seeker"),
        where("hostUid", "==", currentUser.uid)
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

  //エラーが発生した場合はリダイレクト
  if (error) return <Redirect to='/error' />;

  return (
    <>
      <div style={{ textAlign: "center", marginBottom: 20, display: "flex" }}>
        <Icon name='meetup' size='huge' color='teal'/>
        <h1>カジュアル面談応募者リスト</h1>
      </div>
      <Card.Group itemsPerRow={3}>
        {meetyUsers.map((meetyUser) => (
          <MeetyUserListItem meetyUser={meetyUser} key={meetyUser.id} />
        ))}
      </Card.Group>
    </>
  );
}
