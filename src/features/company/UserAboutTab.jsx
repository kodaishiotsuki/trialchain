import React, { useState } from "react";
import { Button, Grid, Header, Tab } from "semantic-ui-react";
import TrialResult from "../profiles/profilePage/TrialResult";
import UserProfileForm from "../profiles/profilePage/UserProfileForm";

export default function UserAboutTab({ profile, isCurrentUser }) {
  const [editMode, setEditMode] = useState(false);
  return (
    <Tab.Pane>
      <Grid>
        <Grid.Column width={16} style={{ height: 40 }}>
          <Header
            floated='left'
            icon='id card outline'
            content='トライアル採用履歴'
            style={{ padding: 5 }}
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
              <TrialResult profile={profile} />
              <Header
                content='キャッチコピー＆この先やってみたいこと'
                icon='address book outline'
                style={{ padding: 5 }}
              />
              <div style={{marginLeft:10}}>{profile.description || null}</div>
            </>
          )}
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  );
}
