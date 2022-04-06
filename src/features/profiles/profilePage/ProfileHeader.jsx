import React, { useEffect, useState } from "react";
import {
  Button,
  Divider,
  Grid,
  Header,
  Icon,
  Item,
  Reveal,
  Segment,
  Statistic,
} from "semantic-ui-react";
import { toast } from "react-toastify";
import {
  followUser,
  getFollowingDoc,
  unFollowUser,
} from "../../../app/firestore/firestoreService";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setFollowUser, setUnFollowUser } from "../profileActions";
import { CLEAR_FOLLOWINGS } from "../profileConstants";

export default function ProfileHeader({ profile, isCurrentUser }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { followingUser } = useSelector((state) => state.profile);

  //動的にフォロワーを獲得（重複禁止!）
  useEffect(() => {
    if (isCurrentUser) return;
    setLoading(true);
    async function fetchFollowingDoc() {
      try {
        const followingDoc = await getFollowingDoc(profile.id);
        if (followingDoc && followingDoc.exists) {
          dispatch(setFollowUser());
        }
      } catch (error) {
        toast.error(error.message);
      }
    }
    fetchFollowingDoc().then(() => setLoading(false));
    return () => {
      dispatch({type:CLEAR_FOLLOWINGS}) //他のユーザーに遷移したときにclearする
    }
  }, [dispatch, isCurrentUser, profile.id]);

  //フォローボタン押した時のアクション
  async function handleFollowUser() {
    setLoading(true);
    try {
      await followUser(profile);
      dispatch(setFollowUser());
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }
  //アンフォローボタン押した時のアクション
  async function handleUnFollowUser() {
    setLoading(true);
    try {
      await unFollowUser(profile);
      dispatch(setUnFollowUser());
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
          <Statistic.Group>
            <Statistic label='Followers' value={profile.followerCount || 0} />
            <Statistic label='Following' value={profile.followingCount || 0} />
          </Statistic.Group>
          {!isCurrentUser && (
            <>
              <Divider />
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
              </Reveal>
            </>
          )}
        </Grid.Column>
      </Grid>
    </Segment>
  );
}
