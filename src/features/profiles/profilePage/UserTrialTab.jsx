import React from "react";
import { Grid, Header, Tab } from "semantic-ui-react";
import TrialResult from "./TrialResult";

export default function UserTrialTab({ profile, isCurrentUser }) {
  // const [editMode, setEditMode] = useState(false);
  return (
    <Tab.Pane>
      <Grid>
        <Grid.Column width={16} style={{ height: 40 }}>
          <Header
            floated='left'
            icon='id card outline'
            content='トライアル採用歴'
            style={{ padding: 5 }}
          />

          {/* {isCurrentUser && (
            <Button
              onClick={() => setEditMode(!editMode)}
              floated='right'
              basic
              content={editMode ? "Cancel" : "Edit"}
            />
          )} */}
        </Grid.Column>
        <Grid.Column width={16}>
          <TrialResult profile={profile} />
          {/* {editMode ? (
            <UserProfileForm profile={profile} />
          ) : (
            <>
              <TrialResult profile={profile} />
            </>
          )} */}
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  );
}
