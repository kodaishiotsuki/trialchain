import React from "react";
import { Dropdown, Image, Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { signOutFirebase } from "../../app/firestore/firebaseService";

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

  return (
    <>
      <Menu.Item position='right'>
        <Image
          avatar
          spaced='right'
          src={currentUserProfile?.photoURL || "/assets/user.png"}
        />
        <Dropdown pointing='top right' text={currentUserProfile?.displayName}>
          <Dropdown.Menu>
            {userType?.userType === "企業" && (
              <Dropdown.Item
                as={Link}
                to='/createEvent'
                text='求人を掲載する'
                icon='edit'
              />
            )}
            {userType?.userType === "企業" && (
              <Dropdown.Item
                as={Link}
                to={`/profile/${currentUserProfile?.id}`}
                text='プロフィールを編集'
                icon='user'
              />
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
              <Dropdown.Item
                as={Link}
                to={`/userProfile/${currentUserProfile?.id}`}
                text='プロフィールを編集'
                icon='user'
              />
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
