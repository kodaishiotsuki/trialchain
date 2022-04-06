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
import { Card } from "semantic-ui-react";
import { app } from "../../app/config/firebase";
import TrialUserListItem from "./TrialUserListItem";

export default function TrialUserList() {
  const { error } = useSelector((state) => state.async);
  const [users, setUsers] = useState([]);
  const db = getFirestore(app);
  const auth = getAuth(app);
  const user = auth.currentUser;

  //コレクションuser,サブコレクションcompanies取得
  useEffect(() => {
    try {
      const q = query(
        collection(db, "users"),
        where("requestCompanyHostId", "array-contains", user.uid)
      );
      getDocs(q).then((querySnapshot) => {
        setUsers(querySnapshot.docs.map((doc) => doc.data()));

        //コンソールで表示
        console.log(querySnapshot.docs.map((doc) => doc.data()));
      });
    } catch (error) {
      console.log(error.message);
    }
  }, [db, user.uid]);

  //エラーが発生した場合はリダイレクト
  if (error) return <Redirect to='/error' />;

  return (
    <>
      <Card.Group itemsPerRow={3}>
        {/* {users.map((user) => (
          <TrialUserListItem user={user} key={user.id} />
        ))} */}
      </Card.Group>
    </>
  );
}
