import { getAuth } from 'firebase/auth';
import { collection, getDocs, getFirestore, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Card, Icon } from 'semantic-ui-react';
import { app } from '../../app/config/firebase';
import OfferCompanyListItem from './OfferCompanyListItem';

export default function OfferCompanyList() {
  const { error } = useSelector((state) => state.async);
  //オファーされた企業
  const [companies, setCompanies] = useState([]);
  //firebase
  const db = getFirestore(app);
  const auth = getAuth(app);
  //ログインユーザー
  const user = auth.currentUser;

  //オファーされた企業リストを取得
  useEffect(() => {
    try {
      const q = query(
        collection(db, "offerUser",user?.uid,"companies"),
        where("userId", "==", user?.uid)
      );
      getDocs(q).then((querySnapshot) => {
        setCompanies(
          querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
        //コンソールで表示
        console.log(
          querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
      });
    } catch (error) {
      console.log(error.message);
    }
  }, [db, user.uid]);

  //エラーが発生した場合はリダイレクト
  if (error) return <Redirect to='/error' />;


  return (
    <>
      <div style={{ textAlign: "center", marginBottom: 20, display: "flex" }}>
        <Icon name='teal paper plane' size='huge' />
        <h1>オファーがあった企業リスト</h1>
      </div>
      <Card.Group itemsPerRow={3}>
        {companies.map((company) => (
          <OfferCompanyListItem company={company} key={company.id} />
        ))}
      </Card.Group>
    </>
  );
}
