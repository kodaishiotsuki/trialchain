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
import { NavLink, Redirect } from "react-router-dom";
import { Button, Container, Icon, Menu } from "semantic-ui-react";
import { app } from "../../app/config/firebase";
import SignedInMenu from "./SignedInMenu";
import SignedOutMenu from "./SignedOutMenu";

export default function NavBar({ setFormOpen }) {
  const { authenticated } = useSelector((state) => state.auth);
  const { error } = useSelector((state) => state.async);

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
        where("email", "==", user.email)
      );
      getDocs(q).then((querySnapshot) => {
        setUserType(querySnapshot.docs.map((doc) => doc.data())[0]);

        //コンソールで表示
        // console.log(querySnapshot.docs.map((doc) => doc.data())[0]);
      });
    } catch (error) {
      console.log(error.message);
    }
  });

  //loading表示
  // if (loading) return <LoadingComponent content='Loading trial...' />;

  //エラーが発生した場合はリダイレクト
  if (error) return <Redirect to='/error' />;

  return (
    <Menu inverted fixed='top'>
      <Container>
        <Menu.Item as={NavLink} exact to='/' header>
          <Icon name='chain' size='large' />
          Trial Chain
        </Menu.Item>
        <Menu.Item as={NavLink} to='/events' name='企業一覧' />
        <Menu.Item as={NavLink} to='/sandbox' name='Sandbox' />

        {authenticated && (
          <>
            {userType.userType === "企業" ? (
              <>
                <Menu.Item as={NavLink} to='/createEvent'>
                  <Button positive inverted content='企業投稿ページ' />
                </Menu.Item>
                <Menu.Item as={NavLink} to='/userList'>
                  <Button positive inverted content='求職者リスト' />
                </Menu.Item>
                <Menu.Item as={NavLink} to='/trialUserList'>
                  <Button negative inverted content='トライアル申請者リスト' />
                </Menu.Item>
              </>
            ) : (
              <>
                <Menu.Item as={NavLink} to='/trial'>
                  <Button positive inverted content='お気に入り企業リスト' />
                </Menu.Item>
                <Menu.Item as={NavLink} to='/trialResult'>
                  <Button negative inverted content='トライアル申請結果' />
                </Menu.Item>
              </>
            )}
          </>
        )}

        {authenticated ? <SignedInMenu /> : <SignedOutMenu />}
      </Container>
    </Menu>
  );
}
