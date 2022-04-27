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
import { Segment } from "semantic-ui-react";
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
      <Segment
        textAlign='center'
        style={{ border: "none", width: 700}}
        // style={{ border: "none", width: 900, margin: "auto" }}
        attached='top'
        secondary
        inverted
        color='teal'
      >
        <h2>トライアル決定企業リスト</h2>
      </Segment>
      {decidedCompanies.map((company) => (
        <DecidedCompanyListItem
          company={company}
          key={company.id}
          user={user}
        />
      ))}
    </>
  );
}
