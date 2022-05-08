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
import { Link } from "react-router-dom";
import { Header, Menu } from "semantic-ui-react";
import { app } from "../../app/config/firebase";

export default function CompanyHomeHeader() {
  const { currentUserProfile } = useSelector((state) => state.profile);
  //登録した求人情報を取得
  const [hostId, setHostId] = useState("");
  const db = getFirestore(app);
  const auth = getAuth(app);
  //ログインユーザー
  const user = auth.currentUser;

  //登録した求人情報を取得(eventsコレクション)
  useEffect(() => {
    try {
      const q = query(
        collection(db, "events"),
        where("hostUid", "==", user?.uid)
      );
      getDocs(q).then((querySnapshot) => {
        setHostId(querySnapshot.docs.map((doc) => doc.data())[0]);

        //コンソールで表示
        console.log(querySnapshot.docs.map((doc) => doc.data())[0]);
      });
    } catch (error) {
      console.log(error.message);
    }
  }, [db, user?.uid]);

  return (
    <Menu vertical style={{ width: "100%", position: "sticky", top: 90 }}>
      <Menu.Item>
        <Header
          icon='user outline'
          color='grey'
          content='ユーザー'
          style={{ fontSize: 20 }}
        />
        <Menu.Menu>
          <Menu.Item
            name='プロフィール編集'
            style={{ fontSize: 20 }}
            as={Link}
            to={`/profile/${currentUserProfile?.id}`}
          />
          <Menu.Item
            name='アカウント管理'
            style={{ fontSize: 20 }}
            as={Link}
            to='/account'
          />
        </Menu.Menu>
      </Menu.Item>

      <Menu.Item>
        <Header
          icon='building outline'
          color='grey'
          content='企業'
          style={{ fontSize: 20 }}
        />
        <Menu.Menu>
          <Menu.Item
            name='求人を掲載する'
            style={{ fontSize: 20 }}
            as={Link}
            to='/createEvent'
          />
          <Menu.Item
            name='掲載内容の更新'
            style={{ fontSize: 20 }}
            as={Link}
            to={`/manage/${hostId.id}`}
          />
        </Menu.Menu>
      </Menu.Item>

      <Menu.Item>
        <Header
          icon='paper plane outline'
          color='grey'
          content='人材'
          style={{ fontSize: 20 }}
        />
        <Menu.Menu>
          <Menu.Item
            name='メッセージ一覧'
            style={{ fontSize: 20 }}
            as={Link}
            to='/matchUser'
          />
          <Menu.Item
            name='応募があった求職者'
            style={{ fontSize: 20 }}
            as={Link}
            to='/trialUserList'
          />
          <Menu.Item
            name='オファーした求職者'
            style={{ fontSize: 20 }}
            as={Link}
            to='/offerUserList'
          />
          <Menu.Item
            name='トライアル雇用決定求職者'
            style={{ fontSize: 20 }}
            as={Link}
            to='/decidedUser'
          />
        </Menu.Menu>
      </Menu.Item>
    </Menu>
  );
}
