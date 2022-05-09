import React, { useEffect, useState } from "react";
import { Dropdown, Icon, Image, Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { signOutFirebase } from "../../app/firestore/firebaseService";
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import { app } from "../../app/config/firebase";
import { getAuth } from "firebase/auth";

export default function SignedInMenu({ userType }) {
  const { currentUserProfile } = useSelector((state) => state.profile);
  const history = useHistory();

  async function handleSignOut() {
    try {
      history.push("/");
      await signOutFirebase();
    } catch (error) {
      toast.error(error.message);
    }
  }

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
    <>
      <Menu.Item position='right'>
        <Icon name='comments' size='big' style={{ marginRight: 10 }} />
        <Icon name='bell outline' size='big' />
        <Image
          size='mini'
          avatar
          spaced='right'
          src={currentUserProfile?.photoURL || "/assets/user.png"}
        />
        <Dropdown
          pointing='top right'
          text={currentUserProfile?.displayName}
          style={{ fontSize: 15 }}
        >
          <Dropdown.Menu style={{ fontSize: 18 }}>
            {userType?.userType === "企業" && (
              <>
                <Dropdown.Item
                  as={Link}
                  to='/createEvent'
                  text='求人を掲載する'
                  icon='edit'
                />
                <Dropdown.Item
                  as={Link}
                  to={`/manage/${hostId.id}`}
                  text='掲載内容の更新'
                  icon='edit outline'
                />
              </>
            )}
            {userType?.userType === "企業" && (
              <>
                <Dropdown.Item
                  as={Link}
                  to='/matchUser'
                  text='メッセージ一覧'
                  icon='envelope outline'
                />
                <Dropdown.Item
                  as={Link}
                  to='/trialUserList'
                  text='応募があった求職者'
                  icon='paper plane outline'
                />
                <Dropdown.Item
                  as={Link}
                  to='/offerUserList'
                  text='オファーした求職者'
                  icon='paper plane'
                />
                <Dropdown.Item
                  as={Link}
                  to='/decidedUser'
                  text='トライアル雇用決定者'
                  icon='building outline'
                />
                <Dropdown.Item
                  as={Link}
                  to={`/profile/${currentUserProfile?.id}`}
                  text='プロフィールを編集'
                  icon='user outline'
                />
              </>
            )}

            {userType?.userType === "企業のメンバー" && (
              <Dropdown.Item
                as={Link}
                to={`/profile/${currentUserProfile?.id}`}
                text='プロフィールを編集'
                icon='user'
              />
            )}

            {userType?.userType === "求職者" && (
              <>
                <Dropdown.Item
                  as={Link}
                  to={`/userProfile/${currentUserProfile?.id}`}
                  text='プロフィールを編集'
                  icon='user outline'
                />
                <Dropdown.Item
                  as={Link}
                  to='/matchCompany'
                  text='メッセージ一覧'
                  icon='envelope outline'
                />
                <Dropdown.Item
                  as={Link}
                  to='/trial'
                  text='ブックマークした企業'
                  icon='bookmark outline'
                />
                {/* <Dropdown.Item
                  as={Link}
                  to={`/userProfile/${currentUserProfile?.id}`}
                  text='申請を送った企業'
                  icon='paper plane outline'
                /> */}
                <Dropdown.Item
                  as={Link}
                  to='/offerCompany'
                  text='オファーがあった企業'
                  icon='paper plane outline'
                />
                <Dropdown.Item
                  as={Link}
                  to='/decidedCompany'
                  text='トライアル雇用決定企業'
                  icon='building outline'
                />
              </>
            )}

            <Dropdown.Item
              as={Link}
              to='/account'
              text='アカウント設定'
              icon='settings'
            />
            <Dropdown.Item
              onClick={handleSignOut}
              text='ログアウト'
              icon='power'
            />
          </Dropdown.Menu>
        </Dropdown>
      </Menu.Item>
    </>
  );
}
