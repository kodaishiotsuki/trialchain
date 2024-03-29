import React, { useEffect, useState } from "react";
import { Header, Menu } from "semantic-ui-react";
import { useDispatch, useSelector } from "react-redux";
import { setFilter } from "../eventActions";
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import { app } from "../../../app/config/firebase";
import { getAuth } from "firebase/auth";

export default function EventFilter({ loading }) {
  const dispatch = useDispatch();
  const { filter } = useSelector((state) => state.event);
  const { authenticated } = useSelector((state) => state.auth);

  //ユーザータイプ
  const [userType, setUserType] = useState([]);
  const db = getFirestore(app);
  const auth = getAuth(app);

  //ログインユーザー
  const user = auth.currentUser;
  // console.log(user);

  //コレクションuser,サブコレクションcompanies取得
  useEffect(() => {
    try {
      const q = query(
        collection(db, "users"),
        where("email", "==", user?.email)
      );
      getDocs(q).then((querySnapshot) => {
        setUserType(querySnapshot.docs.map((doc) => doc.data())[0]);

        //コンソールで表示
        // console.log(querySnapshot.docs.map((doc) => doc.data())[0]);
      });
    } catch (error) {
      console.log(error.message);
    }
  }, [db, user?.email]);
  return (
    <>
      {authenticated && (
        <>
          {userType?.userType === "企業" ? (
            <Menu
              vertical
              size='large'
              style={{ width: "100%", position: "sticky", top: 90 }}
            >
              <Header icon='filter' attached color='teal' content='Filters' />
              <Menu.Item
                content='全ての企業'
                active={filter === "all"}
                onClick={() => dispatch(setFilter("all"))}
                disabled={loading}
              />
              <Menu.Item
                content='自分の企業'
                active={filter === "isHosting"}
                onClick={() => dispatch(setFilter("isHosting"))}
                disabled={loading}
              />
            </Menu>
          ) : (
            <Menu
              vertical
              size='large'
              style={{ width: "100%", position: "sticky", top: 90 }}
            >
              <Header
                icon='search'
                attached
                color='teal'
                content='職種を検索'
              />
              <Menu.Item
                content='全ての職種・企業'
                active={filter === "all"}
                onClick={() => dispatch(setFilter("all"))}
                disabled={loading}
              />
              <Menu.Item
                content='エンジニア'
                active={filter === "エンジニア"}
                onClick={() => dispatch(setFilter("エンジニア"))}
                disabled={loading}
              />
              <Menu.Item
                content='デザイナー'
                active={filter === "デザイナー"}
                onClick={() => dispatch(setFilter("デザイナー"))}
                disabled={loading}
              />
              <Menu.Item
                content='セールス'
                active={filter === "セールス"}
                onClick={() => dispatch(setFilter("セールス"))}
                disabled={loading}
              />
              <Menu.Item
                content='カスタマーサクセス'
                active={filter === "カスタマーサクセス"}
                onClick={() => dispatch(setFilter("カスタマーサクセス"))}
                disabled={loading}
              />
              <Menu.Item
                content='PM・Webディレクション'
                active={filter === "PM・Webディレクション"}
                onClick={() => dispatch(setFilter("PM・Webディレクション"))}
                disabled={loading}
              />
              <Menu.Item
                content='編集・ライティング'
                active={filter === "編集・ライティング"}
                onClick={() => dispatch(setFilter("編集・ライティング"))}
                disabled={loading}
              />
              <Menu.Item
                content='マーケティング・PR'
                active={filter === "マーケティング・PR"}
                onClick={() => dispatch(setFilter("マーケティング・PR"))}
                disabled={loading}
              />
              <Menu.Item
                content='経理'
                active={filter === "経理"}
                onClick={() => dispatch(setFilter("経理"))}
                disabled={loading}
              />
              <Menu.Item
                content='コンサルティング'
                active={filter === "コンサルティング"}
                onClick={() => dispatch(setFilter("コンサルティング"))}
                disabled={loading}
              />
            </Menu>
          )}
        </>
      )}
    </>
  );
}
