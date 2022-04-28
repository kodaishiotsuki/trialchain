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

  //
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
  },[db,user?.email]);

  //loading表示
  // if (loading) return <LoadingComponent content='Loading trial...' />;

  //エラーが発生した場合はリダイレクト
  if (error) return <Redirect to='/error' />;

  return (
    <>
      {userType?.userType === "求職者" && (
        <Menu inverted fixed='top'>
          <Container>
            <Menu.Item as={NavLink} exact to='/events' header>
              <Icon name='chain' size='large' />
              Trial Chain
            </Menu.Item>
            {/* <Menu.Item as={NavLink} to='/events' name='企業リスト' /> */}
            {/* <Menu.Item as={NavLink} to='/sandbox' name='Sandbox' /> */}

            {authenticated && (
              <>
                <Menu.Item as={NavLink} to='/trial'>
                  <Button inverted basic content='オファー' />
                </Menu.Item>
                <Menu.Item as={NavLink} to='/offerCompany'>
                  <Button basic inverted content='逆オファー' />
                </Menu.Item>
                <Menu.Item as={NavLink} to='/decidedCompany'>
                  <Button basic inverted content='トライアル決定' />
                </Menu.Item>
              </>
            )}
            {authenticated ? (
              <SignedInMenu userType={userType} />
            ) : (
              <SignedOutMenu />
            )}
          </Container>
        </Menu>
      )}
    </>
  );
}
