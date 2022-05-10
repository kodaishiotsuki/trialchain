import React, { useState } from 'react'
import { Button, Grid, Header, Item, Tab } from 'semantic-ui-react';
import HopeCareerForm from './HopeCareerForm';

export default function HopeCareerTab({ profile, isCurrentUser }) {
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
            <HopeCareerForm profile={profile} />
          </Grid.Column>
        ) : (
          <>
            <Grid.Column width={16}>
              <Header
                floated='left'
                content='希望職種'
                icon='address book'
                as='h3'
              />
            </Grid.Column>
            <Grid.Column width={16}>
              <Item
                className='ui  tag label'
                content={profile.hopeOccupation || null}
                style={{ marginLeft: 50, fontSize: 15 }}
              />
            </Grid.Column>
            <hr style={{ width: 750 }} />

            <Grid.Column width={16}>
              <Header
                floated='left'
                content='希望業界'
                icon='address book outline'
              />
            </Grid.Column>
            <Grid.Column width={16}>
              <Item
                className='ui  tag label'
                content={profile?.hopeIndustry || ""}
                style={{ fontSize: 15, marginLeft: 50 }}
              />
            </Grid.Column>
            <hr style={{ width: 750 }} />
            <Grid.Column width={16}>
              <Header
                floated='left'
                content='入社希望時期'
                icon='address book outline'
              />
            </Grid.Column>
            <Grid.Column width={16}>
              <Item
                className='ui  tag label'
                content={profile?.hopeJoinSeason || ""}
                style={{ fontSize: 15, marginLeft: 50 }}
              />
            </Grid.Column>
            <hr style={{ width: 750 }} />
            <Grid.Column width={16}>
              <Header
                floated='left'
                content='転職回数'
                icon='address book outline'
              />
            </Grid.Column>
            <Grid.Column width={16}>
              <Item
                className='ui  tag label'
                content={profile?.numberOfJobChanges || ""}
                style={{ fontSize: 15, marginLeft: 50 }}
              />
            </Grid.Column>
          </>
        )}
      </Grid>
    </Tab.Pane>
  );
}
