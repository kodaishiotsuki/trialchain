import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Card, Grid, Header, Tab } from "semantic-ui-react";
import {
  getFollowersCollection,
  getFollowingCollection,
} from "../../../app/firestore/firestoreService";
import useFirestoreCollection from "../../../app/hooks/useFirestoreCollection";
import { listenToFollowers, listenToFollowings } from "../profileActions";
import ProfileCard from "./ProfileCard";

export default function FollowingTab({ profile, activeTab }) {
  const dispatch = useDispatch();
  const { followings, followers } = useSelector((state) => state.profile);
  //⬆︎{profileReducer} = useSelector((state) => state.(rootReducer))

  //firestore
  useFirestoreCollection({
    query:
      activeTab === 3
        ? () => getFollowersCollection(profile.id)
        : () => getFollowingCollection(profile.id),
    data: (data) =>
      activeTab === 3
        ? dispatch(listenToFollowers(data))
        : dispatch(listenToFollowings(data)),
    deps: [activeTab, dispatch],
  });

  return (
    <Tab.Pane>
      <Grid>
        <Grid.Column width={16}>
          <Header
            floated='left'
            icon='user'
            content={activeTab === 3 ? "Followers" : "Following"}
          />
        </Grid.Column>
        <Grid.Column width={16}>
          <Card.Group itemsPerRow={5}>
            {activeTab === 3 &&
              followers.map((profile) => (
                <ProfileCard profile={profile} key={profile.id} />
              ))}
            {activeTab === 4 &&
              followings.map((profile) => (
                <ProfileCard profile={profile} key={profile.id} />
              ))}
          </Card.Group>
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  );
}
