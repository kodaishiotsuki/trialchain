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
import { Card, Icon } from "semantic-ui-react";
import { app } from "../../app/config/firebase";
import TrialUserListItem from "./TrialUserListItem";

export default function TrialUserList() {
  //エラー
  const { error } = useSelector((state) => state.async);
  //FB
  const db = getFirestore(app);
  const auth = getAuth(app);
  const currentUser = auth.currentUser;
  //トライアル申請者（求職者）リスト
  const [requestUsers, setRequestUsers] = useState([]);

  //トライアル申請者リスト取得
  useEffect(() => {
    try {
      const q = query(
        collection(db, "trialCompany", currentUser.uid, "users"),
        where("hostUid", "==", currentUser.uid)
      );
      getDocs(q).then((querySnapshot) => {
        setRequestUsers(
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
        <h1>応募者リスト</h1>
      </div>
      <Card.Group itemsPerRow={4}>
        {requestUsers.map((requestUser) => (
          <TrialUserListItem requestUser={requestUser} key={requestUser.id} />
        ))}
      </Card.Group>
    </>
  );
}
