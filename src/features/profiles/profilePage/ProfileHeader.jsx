import React, { useEffect, useState } from "react";
import { Button, Grid, Header, Icon, Item, Segment } from "semantic-ui-react";
import { toast } from "react-toastify";
import {
  collection,
  doc,
  getDocs,
  getFirestore,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { app } from "../../../app/config/firebase";
import { getAuth } from "firebase/auth";

export default function ProfileHeader({ profile, isCurrentUser }) {
  // const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  //firebase
  const db = getFirestore(app);
  const auth = getAuth(app);
  const user = auth.currentUser;
  // const { followingUser } = useSelector((state) => state.profile);

  //自分の会社を取得
  const [myCompany, setMyCompany] = useState([]);

  //申請があったユーザーID
  console.log(profile.id);

  const userType = user?.userType === "企業"
  const trialCompany = user?.uid === myCompany?.hostUid;

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
        console.log(
          querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))[0]
        );
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

  //サンプル
  async function matchUserToCompany() {
    setLoading(true);
    try {
      await setDoc(doc(db, "match", myCompany.hostUid, "company", profile.id), {
        ...myCompany,
        userName: profile.displayName,
        userPhotoURL: profile.photoURL || "/assets/user.png",
        userId: profile.id,
      });
      // //firestoreのアクション
      // setDoc(doc(db, "match", user.uid, "user", profile.id), {
      //   displayName: profile.displayName,
      //   photoURL: profile.photoURL || "/assets/user.png",
      //   uid: profile.id,
      // });
    } catch (error) {
      toast.error(error.message);
    } finally {
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
          {/* <Statistic.Group>
            <Statistic label='Followers' value={profile.followerCount || 0} />
            <Statistic label='Following' value={profile.followingCount || 0} />
          </Statistic.Group> */}
          {/* {!isCurrentUser && ( */}
          <>
            {userType &&
              trialCompany &&(
                <Button
                  onClick={matchUserToCompany}
                  loading={loading}
                  content='トライアル承認'
                />
              )}

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
          </>
          {/* )} */}
        </Grid.Column>
      </Grid>
    </Segment>
  );
}
