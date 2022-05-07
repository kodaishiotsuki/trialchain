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
import UserListItem from "./UserListItem";
import { Card, Tab } from "semantic-ui-react";
import OfferUserListItem from "./OfferUserListItem";
import { getAuth } from "firebase/auth";
import MatchOfferUserList from "./MatchOfferUserList";

export default function UserList({ match, history, location }) {
  const { error } = useSelector((state) => state.async);
  const [users, setUsers] = useState([]);
  const db = getFirestore(app);
  const auth = getAuth(app);
  const currentUser = auth.currentUser;
  //タブメニュー
  const [activeTab, setActiveTab] = useState(0);
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
      menuItem: "オファーした求職者リスト",
      render: () => (
        <Card.Group itemsPerRow={4} >
          {offerUsers.map((user) => (
            <OfferUserListItem
              user={user}
              key={user.id}
              activeTab={activeTab}
            />
          ))}
        </Card.Group>
      ),
    },
    {
      menuItem: "マッチした求職者リスト",
      render: () => <MatchOfferUserList activeTab={activeTab} />,
    },
  ];

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

  //エラーが発生した場合はリダイレクト
  if (error) return <Redirect to='/error' />;

  return (
    <>
      {/* <Segment
        textAlign='center'
        style={{ border: "none", width: 700, marginBottom: 20 }}
        // style={{ border: "none", margin: "auto", marginBottom: 20 }}
        attached='top'
        secondary
        inverted
        color='teal'
      >
        <h2>求職者リスト</h2>
      </Segment> */}
      <Tab
        panes={panes}
        onTabChange={(e, data) => setActiveTab(data.activeIndex)}
      />
    </>
  );
}
