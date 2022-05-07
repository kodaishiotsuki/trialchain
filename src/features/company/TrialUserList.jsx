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
import { Tab, Card } from "semantic-ui-react";
import { app } from "../../app/config/firebase";
import MatchUserListItem from "./MatchUserListItem";
import TrialUserListItem from "./TrialUserListItem";
import UserListItem from "./UserListItem";

export default function TrialUserList() {
  //エラー
  const { error } = useSelector((state) => state.async);
  //FB
  const db = getFirestore(app);
  const auth = getAuth(app);
  const currentUser = auth.currentUser;
  //タブメニュー
  const [activeTab, setActiveTab] = useState(0);
  //求職者リスト
  const [users, setUsers] = useState([]);
  //トライアル申請者（求職者）リスト
  const [requestUsers, setRequestUsers] = useState([]);

  //コレクションusers取得
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
  }, [db]);

  //Tab内容
  const panes = [
    {
      menuItem: "求職者リスト",
      render: () => (
        <Card.Group itemsPerRow={4}>
          {users.map((user) => (
            <UserListItem user={user} key={user.id} activeTab={activeTab} />
          ))}
        </Card.Group>
      ),
    },
    {
      menuItem: "オファーがあった求職者リスト",
      render: () => (
        <Card.Group itemsPerRow={4} >
          {requestUsers.map((requestUser) => (
            <TrialUserListItem
              requestUser={requestUser}
              activeTab={activeTab}
              key={requestUser.id}
            />
          ))}
        </Card.Group>
      ),
    },
    {
      menuItem: "マッチした求職者リスト",
      render: () => <MatchUserListItem activeTab={activeTab} />,
    },
  ];

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
    <Tab
      panes={panes}
      onTabChange={(e, data) => setActiveTab(data.activeIndex)}
    />
  );
}
