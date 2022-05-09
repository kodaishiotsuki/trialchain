import { getAuth } from "firebase/auth";
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { Card, Icon } from "semantic-ui-react";
import { app } from "../../app/config/firebase";
import DecidedCompanyListItem from "./DecidedCompanyListItem";

export default function DecidedCompanyList() {
  const { error } = useSelector((state) => state.async);
  const [decidedCompanies, setDecidedCompanies] = useState([]);
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
        collection(db, "decidedUser", user?.uid, "companies"),
        where("userId", "==", user?.uid)
      );
      getDocs(q).then((querySnapshot) => {
        setDecidedCompanies(
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
  }, [db, user?.uid]);

  //エラーが発生した場合はリダイレクト
  if (error) return <Redirect to='/error' />;

  return (
    <>
      <div style={{ textAlign: "center", marginBottom: 20, display: "flex" }}>
        <Icon name='teal paper plane' size='huge' />
        <h1>トライアル雇用決定企業リスト</h1>
      </div>
      <Card.Group itemsPerRow={3}>
        {decidedCompanies.map((company) => (
          <DecidedCompanyListItem
            company={company}
            key={company.id}
            user={user}
          />
        ))}
      </Card.Group>
    </>
  );
}
