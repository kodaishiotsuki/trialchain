import { getAuth } from 'firebase/auth';
import { collection, getDocs, getFirestore, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Tab } from 'semantic-ui-react';
import { app } from '../../app/config/firebase';
import MatchOfferCompanyList from './MatchOfferCompanyList';
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
  //タブメニュー
  const [activeTab, setActiveTab] = useState(0);

  console.log(user.uid)
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

  //Tab内容
  const panes = [
    {
      menuItem: "オファーされた企業リスト",
      render: () => (
        <>
          {companies.map((company) => (
            <OfferCompanyListItem
              company={company}
              key={company.id}
              activeTab={activeTab}
            />
          ))}
        </>
      ),
    },
    {
      menuItem: "マッチした企業リスト",
      render: () => <MatchOfferCompanyList />,
    },
  ];

  return (
    <>
      {/* <Segment
        textAlign='center'
        // style={{ border: "none",width:900,margin:"auto" }}
        style={{ border: "none",width:700}}
        attached='top'
        secondary
        inverted
        color='teal'
      >
        <h2>お気に入り企業リスト</h2>
      </Segment> */}
      <Tab
        panes={panes}
        onTabChange={(e, data) => setActiveTab(data.activeIndex)}
      />
    </>
  );
}
