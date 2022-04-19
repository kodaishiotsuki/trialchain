import React, { useState } from "react";
import { Button, Grid, Header, Tab } from "semantic-ui-react";
import UserProfileForm from "../profiles/profilePage/UserProfileForm";

export default function UserAboutTab({ profile, isCurrentUser }) {
  const [editMode, setEditMode] = useState(false);
  return (
    <Tab.Pane>
      <Grid>
        <Grid.Column width={16} style={{ height: 40 }}>
          <Header
            floated='left'
            content='キャッチコピー＆この先やってみたいこと'
            icon='address book outline'
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
              <h3 style={{ marginLeft: 10,marginTop:10 }}>
                {profile.description || null}
              </h3>
            </>
          )}
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  );
}
