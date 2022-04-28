import { getAuth } from "firebase/auth";
import { collection, doc, getDocs, getFirestore, query, setDoc, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { Button, Grid, Header, Icon, Item, Segment } from "semantic-ui-react";
import { app } from "../../../app/config/firebase";

export default function UserProfileHeader({ profile }) {
  //FB
  const db = getFirestore(app);
  const auth = getAuth(app);
  const user = auth.currentUser;
  const [loading, setLoading] = useState(false);
  const { error } = useSelector((state) => state.async);
  const [buttonClick, setButtonClick] = useState(false);
  const [companies, setCompanies] = useState("");

  console.log(profile);
  console.log(user.uid);

  //自分の企業を取得
  useEffect(() => {
    try {
      const q = query(
        collection(db, "events"),
        where("hostUid", "==", user?.uid)
      );
      getDocs(q).then((querySnapshot) => {
        setCompanies(
          querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))[0]
        );
        //コンソールで表示
        console.log(
          querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))[0]
        );
      });
    } catch (error) {
      console.log(error.message);
    }
  }, [db, user?.uid]);

  //エラーが発生した場合はリダイレクト
  if (error) return <Redirect to='/error' />;


  //トライアルオファー（企業からユーザーへ）
  async function companyTrialRequestUser() {
    setLoading(true);
    try {
      await setDoc(
        doc(db, "offerCompany", user?.uid, "users", profile?.userUid),
        {
          ...companies,
          userName: profile.displayName,
          userPhotoURL: profile.photoURL || "/assets/user.png",
          userId: profile.userUid,
        }
      );
      await setDoc(
        doc(db, "offerUser", profile?.userUid, "companies", user?.uid),
        {
          ...companies,
          userName: profile.displayName,
          userPhotoURL: profile.photoURL || "/assets/user.png",
          userId: profile.userUid,
        }
      );
    } catch (error) {
      console.log("fserror", error);
      throw error;
    } finally {
      setButtonClick(true);
      setLoading(false);
    }
  }

  return (
    <Segment>
      <Grid>
        <Grid.Column width={8}>
          <Item.Group>
            <Item>
              <Item.Image
                avatar
                size='small'
                src={profile.photoURL || "/assets/user.png"}
              />
              <Item.Content verticalAlign='middle'>
                <Header
                  style={{ display: "block", margin: 20, fontSize: 30 }}
                  content={profile.displayName}
                />
                <Item.Content
                  className='ui  tag label'
                  content={profile.occupation}
                  style={{ fontSize: 15, marginLeft: 30 }}
                />
              </Item.Content>
            </Item>
          </Item.Group>
        </Grid.Column>
        <Grid.Column width={4} verticalAlign='middle'>
          <div>
            <a href={profile.twitterURL}>
              <Icon size='big' color='teal' name='twitter' />
            </a>
            <a href={profile.facebookURL}>
              <Icon size='big' color='teal' name='facebook square' />
            </a>
            <a href={profile.gitHubURL}>
              <Icon size='big' color='teal' name='github' />
            </a>
            <a href={profile.noteURL}>
              <Icon size='big' color='teal' name='sticky note outline' />
            </a>
          </div>
        </Grid.Column>
        <Grid.Column width={4}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            {companies !== undefined && (
              <>
                <Button
                  color='teal'
                  floated='right'
                  onClick={companyTrialRequestUser}
                  loading={loading}
                  content={buttonClick ? "オファー済み" : "オファーする"}
                  style={{ fontSize: 15, marginBottom: 20, marginTop: 30 }}
                  disabled={buttonClick}
                />
                <Button
                  as={Link}
                  to='/userList'
                  floated='right'
                  content='戻る'
                  style={{ fontSize: 15 }}
                />
              </>
            )}
          </div>
        </Grid.Column>
      </Grid>
    </Segment>
  );
}
