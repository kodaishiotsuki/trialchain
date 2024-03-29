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

// import LoadingComponent from "../../app/layout/LoadingComponent";
import { Redirect } from "react-router-dom";
import TrialListItem from "./TrialListItem";
import { getAuth } from "firebase/auth";
import { Card, Icon } from "semantic-ui-react";

export default function TrialList() {
  const { error } = useSelector((state) => state.async);
  //オファーする企業
  const [companies, setCompanies] = useState([]);
  //firebase
  const db = getFirestore(app);
  const auth = getAuth(app);
  //ログインユーザー
  const user = auth.currentUser;

  //お気に入り企業リストを取得
  useEffect(() => {
    try {
      const q = query(
        collection(db, "events"),
        where("favoriteUserId", "array-contains", user.uid)
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
        <Icon name='teal bookmark' size='huge' />
        <h1>ブックマークした企業リスト</h1>
      </div>
      <Card.Group itemsPerRow={3}>
        {companies.map((company) => (
          <TrialListItem company={company} key={company.id} />
        ))}
      </Card.Group>
    </>
  );
}
