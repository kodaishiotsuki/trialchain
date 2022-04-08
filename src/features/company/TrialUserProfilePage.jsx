import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Grid } from "semantic-ui-react";
import { getUserProfile } from "../../app/firestore/firestoreService";
import useFirestoreDoc from "../../app/hooks/useFirestoreDoc";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { listenToSelectedUserProfile } from "../profiles/profileActions";
import TrialUserProfileContent from "./TrialUserProfileContent";
import TrialUserProfileHeader from "./TrialUserProfileHeader";

export default function TrialUserProfilePage({ match }) {
  const dispatch = useDispatch();
  const { selectedUserProfile, currentUserProfile } = useSelector(
    (state) => state.profile
  );
  const { currentUser } = useSelector((state) => state.auth);
  const { loading, error } = useSelector((state) => state.async);
  let profile;

  //firestoreデータ取得
  useFirestoreDoc({
    query: () => getUserProfile(match.params.id),
    data: (profile) => dispatch(listenToSelectedUserProfile(profile)),
    deps: [dispatch, match.params.id],

    shouldExecute: match.params.id !== currentUser.uid,
  });
  if (match.params.id === currentUser.uid) {
    profile = currentUserProfile;
  } else {
    profile = selectedUserProfile;
  }

  if ((loading && !profile) || (!profile && !error))
    return <LoadingComponent content='Loading profile...' />;

  return (
    <Grid>
      <Grid.Column width={16}>
        <TrialUserProfileHeader
          profile={profile}
          isCurrentUser={currentUser.uid === profile.id}
        />
        <TrialUserProfileContent
          profile={profile}
          isCurrentUser={currentUser.uid === profile.id}
        />
      </Grid.Column>
    </Grid>
  );
}
