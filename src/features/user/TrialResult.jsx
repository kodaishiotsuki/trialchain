import { getAuth } from "firebase/auth";
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { app } from "../../app/config/firebase";
import TrialResultItem from "./TrialResultItem";

export default function TrialResult({ match, history, location }) {
  const { error } = useSelector((state) => state.async);
  const [companies, setCompanies] = useState([]);
  //firebase
  const db = getFirestore(app);
  const auth = getAuth(app);
  //ログインユーザー
  const user = auth.currentUser;

  // console.log(user.uid)

  //マッチした企業リストを取得
  useEffect(() => {
    try {
      const q = query(
        collection(db, "matchUser", user.uid, "companies"),
        where("userId", "==", user.uid)
      );
      getDocs(q).then((querySnapshot) => {
        setCompanies(
          querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
        //コンソールで表示
        // console.log(
        //   querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        // );
      });
    } catch (error) {
      console.log(error.message);
    }
  }, [db, user.uid]);

  //エラーが発生した場合はリダイレクト
  if (error) return <Redirect to='/error' />;

  return (
    <>
      {companies.map((company) => (
        <TrialResultItem company={company} key={company.id} user={user} />
      ))}
    </>
  );
}
