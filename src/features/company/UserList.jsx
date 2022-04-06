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
import { Redirect } from "react-router-dom";
// import { getAuth } from "firebase/auth";
import UserListItem from "./UserListItem";
import { Card } from "semantic-ui-react";


export default function UserList({ match, history, location }) {
  const { error } = useSelector((state) => state.async);
  const [users, setUsers] = useState([]);
  const db = getFirestore(app);
  // const auth = getAuth(app);

  //ログインユーザー
  // const user = auth.currentUser;
  // console.log(user);

  //コレクションuser,サブコレクションcompanies取得
  useEffect(() => {
    try {
      const q = query(
        collection(db, "users"),
        where("userType", "==", "求職者")
      );
      getDocs(q).then((querySnapshot) => {
        setUsers(querySnapshot.docs.map((doc) => doc.data()));

        //コンソールで表示
        // console.log(querySnapshot.docs.map((doc) => doc.data()));
      });
    } catch (error) {
      console.log(error.message);
    }

    // const usersCollectionRef = collection(db, "events", user.uid, "companies");
    // getDocs(usersCollectionRef).then((querySnapshot) => {
    //   setCompanies(
    //     querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    //   );
    // });
  }, [db]);
  // console.log(companies);

  //loading表示
  // if (loading) return <LoadingComponent content='Loading trial...' />;

  //エラーが発生した場合はリダイレクト
  if (error) return <Redirect to='/error' />;

  return (
    <>
      <Card.Group itemsPerRow={3}>
        {users.map((user) => (
          <UserListItem user={user} key={user.id} />
        ))}
      </Card.Group>
    </>
  );
}
