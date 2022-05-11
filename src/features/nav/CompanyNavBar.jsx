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

export default function CompanyNavBar({ setFormOpen }) {
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
  }, [db, user?.email]);

  //loading表示
  // if (loading) return <LoadingComponent content='Loading trial...' />;

  //エラーが発生した場合はリダイレクト
  if (error) return <Redirect to='/error' />;

  return (
    <>
      {userType?.userType !== "求職者" && (
        <Menu inverted fixed='top' className='company'>
          <Container>
            <Menu.Item as={NavLink} exact to='/' header>
              <Icon name='chain' size='large' />
              Trial Chain
            </Menu.Item>
            {/* <Menu.Item as={NavLink} to='/events' name='求人企業リスト' /> */}
            <Menu.Item
              as={NavLink}
              to='/companyHome'
              name='ホーム画面'
              style={{ fontSize: 15 }}
            />
            <Menu.Item
              as={NavLink}
              to='/userList'
              name='求職者リスト'
              style={{ fontSize: 15 }}
            />
            <Menu.Item
              as={NavLink}
              to='/events'
              name='掲載企業リスト'
              style={{ fontSize: 15 }}
            />
            {/* <Menu.Item as={NavLink} to='/sandbox' name='Sandbox' /> */}

            {authenticated && (
              <>
                {userType?.userType === "企業" && (
                  <>
                    {/* <Menu.Item as={NavLink} to='/userList'>
                      <Button inverted basic content='オファー' />
                    </Menu.Item>
                    <Menu.Item as={NavLink} to='/trialUserList'>
                      <Button basic inverted content='逆オファー' />
                    </Menu.Item>
                    <Menu.Item as={NavLink} to='/decidedUser'>
                      <Button basic inverted content='トライアル決定' />
                    </Menu.Item> */}
                  </>
                )}
                {userType?.userType === "企業のメンバー" && (
                  <>
                    <Menu.Item as={NavLink} to='/userList'>
                      <Button inverted basic content='求職者リスト' />
                    </Menu.Item>
                    <Menu.Item as={NavLink} to='/matchUserList'>
                      <Button basic inverted content='マッチした求職者' />
                    </Menu.Item>
                    {/* <Menu.Item as={NavLink} to='/decidedUser'>
                      <Button basic inverted content='トライアル決定者' />
                    </Menu.Item> */}
                  </>
                )}
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
