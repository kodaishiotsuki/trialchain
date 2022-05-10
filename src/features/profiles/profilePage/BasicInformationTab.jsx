import React, { useState } from 'react'
import { Button, Grid, Header, Item, Tab } from 'semantic-ui-react';
import BasicInformationForm from './BasicInformationForm';

export default function BasicInformationTab({ profile, isCurrentUser }) {
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
            <BasicInformationForm profile={profile} />
          </Grid.Column>
        ) : (
          <>
            <Grid.Column width={16}>
              <Header
                floated='left'
                content='性別'
                icon='address book'
                as='h3'
              />
            </Grid.Column>
            <Grid.Column width={16}>
              <Item
                className='ui  tag label'
                content={profile?.sex || null}
                style={{ marginLeft: 50, fontSize: 15 }}
              />
            </Grid.Column>
            <hr style={{ width: 750 }} />

            <Grid.Column width={16}>
              <Header
                floated='left'
                content='年齢'
                icon='address book outline'
              />
            </Grid.Column>
            <Grid.Column width={16}>
              <Item
                className='ui  tag label'
                content={profile?.age || ""}
                style={{ fontSize: 15, marginLeft: 50 }}
              />
            </Grid.Column>
          </>
        )}
      </Grid>
    </Tab.Pane>
  );
}
