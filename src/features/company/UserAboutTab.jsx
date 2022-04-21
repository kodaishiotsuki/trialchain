import React, { useState } from "react";
import { Button, Grid, Header, Tab } from "semantic-ui-react";
import UserProfileForm from "../profiles/profilePage/UserProfileForm";

export default function UserAboutTab({ profile, isCurrentUser }) {
  const [editMode, setEditMode] = useState(false);
  return (
    <Tab.Pane>
      <Grid>
        <Grid.Column width={16} style={{ height: 40 }}>
          {isCurrentUser && (
            <Button
              onClick={() => setEditMode(!editMode)}
              floated='right'
              basic
              content={editMode ? "Cancel" : "Edit"}
            />
          )}
        </Grid.Column>

        {editMode ? (
          <Grid.Column width={16}>
            <UserProfileForm profile={profile} />
          </Grid.Column>
        ) : (
          <>
            <Grid.Column width={16}>
              <Header
                floated='left'
                content='ミッション（MISSION）'
                icon='address book'
                as='h2'
              />
            </Grid.Column>
            <Grid.Column width={16}>
              <Header
                content={profile.mission || null}
                as='h2'
                style={{ marginLeft: 45 }}
              />
            </Grid.Column>
            <hr style={{ width: 750 }} />
            <Grid.Column width={16}>
              <Header
                floated='left'
                content='ビジョン（VISION）'
                icon='address book outline'
                as='h2'
              />
            </Grid.Column>
            <Grid.Column width={16}>
              <Header
                content={profile.vision || null}
                as='h2'
                style={{ marginLeft: 45 }}
              />
            </Grid.Column>
            <hr style={{ width: 750 }} />
            <Grid.Column width={16}>
              <Header
                floated='left'
                content='バリュー（VALUE）'
                icon='address book'
                as='h2'
              />
            </Grid.Column>
            <Grid.Column width={16}>
              <Header
                content={profile.value || null}
                as='h2'
                style={{ marginLeft: 45 }}
              />
            </Grid.Column>
          </>
        )}
      </Grid>
    </Tab.Pane>
  );
}
