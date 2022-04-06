// import { getAuth } from "firebase/auth";
// import { getFirestore } from "firebase/firestore";
import React, { useState } from "react";
import { Button, Card, Grid, Header, Image, Tab } from "semantic-ui-react";
// import { app } from "../../../app/config/firebase";
// import { format } from "date-fns";
import ProfileForm from "./ProfileForm";

export default function AboutTab({ profile, isCurrentUser }) {
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
            content={`About ${profile.displayName}`}
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
            <ProfileForm profile={profile} />
          ) : (
            <>
              <div>
                {/* <strong>
                  Member since:{format(profile.createdAt, "yyyy/MM/dd")}
                </strong> */}
                <div>{profile.description || null}</div>

                <Card centered style={{ width: "85%" }}>
                  <Card.Content style={{ display: "flex" }}>
                    <Image
                      src={profile.photoURL}
                      circular
                      style={{ width: 50 }}
                    />
                    <Header
                      content={profile.displayName}
                      as='h3'
                      style={{ marginLeft: 15 }}
                    />
                  </Card.Content>
                  <Card.Content>
                    <a href={profile.meetyURL}>
                      <Image
                        centered
                        src={"/assets/metty.png"}
                        style={{
                          width: "100%",
                          maxHeight: "170px",
                          marginTop: 15,
                        }}
                      />
                    </a>
                  </Card.Content>

                  <Card.Content>
                    <h3 style={{ textAlign: "center" }}>
                      <i className='hand point up outline icon' />
                      Go to the metty
                      <i className='hand point up outline icon' />
                    </h3>
                  </Card.Content>
                  <Card.Content></Card.Content>
                </Card>
              </div>
            </>
          )}
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  );
}
