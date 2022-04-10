import React, { useEffect, useState } from "react";
import { Button, Grid, Header, Icon, Item, Segment } from "semantic-ui-react";
import { toast } from "react-toastify";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { app } from "../../app/config/firebase";
import { getAuth } from "firebase/auth";
import { Link } from "react-router-dom";

export default function TrialUserProfileHeader({ profile }) {
  // const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  //firebase
  const db = getFirestore(app);
  const auth = getAuth(app);
  const user = auth.currentUser;
  //トライアル承認ボタン
  const [buttonClick, setButtonClick] = useState(false);

  // const { followingUser } = useSelector((state) => state.profile);

  //自分の会社を取得
  const [myCompany, setMyCompany] = useState([]);

  //申請があったユーザーID
  // console.log(profile.id);

  //自分の企業を取得
  useEffect(() => {
    try {
      const q = query(
        collection(db, "events"),
        where("hostUid", "==", user.uid)
      );
      getDocs(q).then((querySnapshot) => {
        setMyCompany(
          querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))[0]
        );
        //コンソールで表示
        // console.log(
        //   querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))[0]
        // );
      }, []);
    } catch (error) {
      console.log(error.message);
    }
  });

  //動的にフォロワーを獲得（重複禁止!）
  // useEffect(() => {
  //   if (isCurrentUser) return;
  //   setLoading(true);
  //   async function fetchFollowingDoc() {
  //     try {
  //       const followingDoc = await getFollowingDoc(profile.id);
  //       if (followingDoc && followingDoc.exists) {
  //         dispatch(setFollowUser());
  //       }
  //     } catch (error) {
  //       toast.error(error.message);
  //     }
  //   }
  //   fetchFollowingDoc().then(() => setLoading(false));
  //   return () => {
  //     dispatch({type:CLEAR_FOLLOWINGS}) //他のユーザーに遷移したときにclearする
  //   }
  // }, [dispatch, isCurrentUser, profile.id]);

  //フォローボタン押した時のアクション
  // async function handleFollowUser() {
  //   setLoading(true);
  //   try {
  //     await followUser(profile);
  //     dispatch(setFollowUser());
  //   } catch (error) {
  //     toast.error(error.message);
  //   } finally {
  //     setLoading(false);
  //   }
  // }
  //アンフォローボタン押した時のアクション
  // async function handleUnFollowUser() {
  //   setLoading(true);
  //   try {
  //     await unFollowUser(profile);
  //     dispatch(setUnFollowUser());
  //   } catch (error) {
  //     toast.error(error.message);
  //   } finally {
  //     setLoading(false);
  //   }
  // }

  //profile ユーザー
  //user 会社

  //マッチング
  async function matchUserToCompany() {
    setLoading(true);
    try {
      await setDoc(doc(db, "matchCompany", user.uid, "users", profile.id), {
        ...myCompany,
        userName: profile.displayName,
        userPhotoURL: profile.photoURL || "/assets/user.png",
        userId: profile.id,
      });
      await setDoc(doc(db, "matchUser", profile.id, "companies", user.uid), {
        ...myCompany,
        userName: profile.displayName,
        userPhotoURL: profile.photoURL || "/assets/user.png",
        userId: profile.id,
      });
      await deleteDoc(doc(db, "trialCompany", user.uid, "users", profile.id));
      //groupコレクション追加
      await addDoc(collection(db, "group"), {
        ...myCompany,
        userName: profile.displayName,
        userPhotoURL: profile.photoURL || "/assets/user.png",
        userId: profile.id,
      });
    } catch (error) {
      toast.error(error.message);
    } finally {
      setButtonClick(true);
      setLoading(false);
    }
  }

  return (
    <Segment>
      <Grid>
        <Grid.Column width={7}>
          <Item.Group>
            <Item>
              <Item.Image
                avatar
                size='small'
                src={profile.photoURL || "/assets/user.png"}
              />
              <Item.Content verticalAlign='middle'>
                <Header
                  as='h1'
                  style={{ display: "block", marginBottom: 10 }}
                  content={profile.displayName}
                />
              </Item.Content>
            </Item>
          </Item.Group>
        </Grid.Column>
        <Grid.Column width={5} verticalAlign='middle'>
          <div>
            <a href={profile.twitterURL}>
              <Icon size='huge' color='teal' name='twitter' />
            </a>
            <a href={profile.facebookURL}>
              <Icon size='huge' color='teal' name='facebook square' />
            </a>
            <a href={profile.gitHubURL}>
              <Icon size='huge' color='teal' name='github' />
            </a>
            <a href={profile.noteURL}>
              <Icon size='huge' color='teal' name='sticky note outline' />
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
            <Button
              color="teal"
              floated='right'
              onClick={matchUserToCompany}
              loading={loading}
              content={buttonClick ? "承認済み" : "トライアル承認"}
              style={{ fontSize: 20, marginBottom: 20, marginTop: 20 }}
              disabled={buttonClick}
            />
            <Button
              as={Link}
              to='/trialUserList'
              floated='right'
              content='戻る'
              style={{ fontSize: 20 }}
            />

            {/* <Divider />
              <Reveal animated='move'>
                <Reveal.Content visible style={{ width: "100%" }}>
                  <Button
                    fluid
                    color='teal'
                    content={followingUser ? "Following" : "Not Following"}
                  />
                </Reveal.Content>
                <Reveal.Content hidden style={{ width: "100%" }}>
                  <Button
                    basic
                    fluid
                    color={followingUser ? "red" : "green"}
                    content={followingUser ? "UnFollow" : "Follow"}
                    onClick={
                      followingUser
                        ? () => handleUnFollowUser()
                        : () => handleFollowUser()
                    }
                    loading={loading}
                  />
                </Reveal.Content>
              </Reveal> */}
          </div>
          {/* )} */}
        </Grid.Column>
      </Grid>
    </Segment>
  );
}
