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
import { Card, Icon} from "semantic-ui-react";
import OfferUserListItem from "./OfferUserListItem";
import { getAuth } from "firebase/auth";

export default function OfferUserList({ match, history, location }) {
  const { error } = useSelector((state) => state.async);
  const db = getFirestore(app);
  const auth = getAuth(app);
  const currentUser = auth.currentUser;
  //オファー求職者リスト
  const [offerUsers, setOfferUsers] = useState([]);

  //オファー求職者リスト取得
  useEffect(() => {
    try {
      const q = query(
        collection(db, "offerCompany", currentUser.uid, "users"),
        where("hostUid", "==", currentUser.uid)
      );
      getDocs(q).then((querySnapshot) => {
        setOfferUsers(
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
        <Icon name='teal users' size='huge' />
        <h1>オファーした求職者リスト</h1>
      </div>
      <Card.Group itemsPerRow={4}>
        {offerUsers.map((user) => (
          <OfferUserListItem user={user} key={user.id} />
        ))}
      </Card.Group>
    </>
  );
}
