import React, { useState } from "react";
import { Button, Grid, Header, Tab } from "semantic-ui-react";
import UserProfileForm from "../profiles/profilePage/UserProfileForm";

export default function UserAboutTab({ profile, isCurrentUser }) {
  const [editMode, setEditMode] = useState(false);
  //ユーザータイプ
  // const [userType, setUserType] = useState([]);
  // const db = getFirestore(app);
  // const auth = getAuth(app);

  // //ログインユーザー
  // const user = auth.currentUser;
  // console.log(user);

  //コレクションuser,サブコレクションcompanies取得
  // useEffect(() => {
  //   try {
  //     const q = query(
  //       collection(db, "users"),
  //       where("email", "==", user.email)
  //     );
  //     getDocs(q).then((querySnapshot) => {
  //       setUserType(querySnapshot.docs.map((doc) => doc.data())[0].userType);

  //       //コンソールで表示
  //       console.log(querySnapshot.docs.map((doc) => doc.data())[0].userType);
  //     }, []);
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // });
  return (
    <Tab.Pane>
      <Grid>
        <Grid.Column width={16}>
          <Header
            floated='left'
            icon='user'
            content={`${profile.displayName}`}
          />

          {isCurrentUser && (
            <Button
              onClick={() => setEditMode(!editMode)}
              floated='right'
              basic
              content={editMode ? "Cancel" : "Edit"}
            />
          )}
        </Grid.Column>
        <Grid.Column width={16}>
          {editMode ? (
            <UserProfileForm profile={profile} />
          ) : (
            <>
              <div>
                {/* <strong>
                  Member since:{format(profile.createdAt, "yyyy/MM/dd")}
                </strong> */}
                <div>{profile.description || null}</div>
              </div>
            </>
          )}
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  );
}
