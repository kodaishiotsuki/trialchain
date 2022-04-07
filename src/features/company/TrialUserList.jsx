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
import { Tab } from "semantic-ui-react";
import { app } from "../../app/config/firebase";
import MatchUserListItem from "./MatchUserListItem";
import TrialUserListItem from "./TrialUserListItem";

export default function TrialUserList() {
  const { error } = useSelector((state) => state.async);
  const [users, setUsers] = useState([]);
  const db = getFirestore(app);
  const auth = getAuth(app);
  const user = auth.currentUser;
  //タブメニュー
  const [activeTab, setActiveTab] = useState(0);
  const panes = [
    {
      menuItem: "直近の申請者リスト",
      render: () => (
        <TrialUserListItem
          users={users}
          activeTab={activeTab}
          key={users.id}
        />
      ),
    },
    {
      menuItem: "マッチした申請者リスト",
      render: () => (
        <MatchUserListItem users={users} activeTab={activeTab} key={users.id} />
      ),
    },
  ];

  //トライアル申請者リスト取得
  useEffect(() => {
    try {
      const q = query(
        collection(db, "users"),
        where("trialRequestCompanyHostId", "array-contains", user.uid)
      );
      getDocs(q).then((querySnapshot) => {
        setUsers(querySnapshot.docs.map((doc) => doc.data()));

        //コンソールで表示
        // console.log(querySnapshot.docs.map((doc) => doc.data()));
      });
    } catch (error) {
      console.log(error.message);
    }
  },[db,user.uid]);

  // console.log(users);

  // Object.keys(users,"userUid").forEach(function(e) {
  //   console.log(e)
  // })
  // const Id = users.forEach(function (e) {
  //   console.log(e.userUid);
  //   return e.userUid;
  // });

  

  //エラーが発生した場合はリダイレクト
  if (error) return <Redirect to='/error' />;


  return (
    <Tab
      // menu={{ fluid: true, vertical: false }}
      // menuPosition='right'
      panes={panes}
      onTabChange={(e, data) => setActiveTab(data.activeIndex)}
    />
  );
}
