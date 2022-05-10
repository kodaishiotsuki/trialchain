import React, { useState } from "react";
import { Button, Card, Grid, Header, Item, Tab } from "semantic-ui-react";
import CareerForm from "./CareerForm";

export default function CarerTab({ profile, isCurrentUser }) {
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
            <CareerForm profile={profile} />
          </Grid.Column>
        ) : (
          <>
            <Grid.Column width={16}>
              <Header
                floated='left'
                content='経験した職種'
                icon='address book'
                as='h3'
              />
            </Grid.Column>
            <Grid.Column width={16}>
              <Item
                className='ui  tag label'
                content={profile?.occupation || null}
                style={{ marginLeft: 50, fontSize: 15 }}
              />
            </Grid.Column>
            <hr style={{ width: 750 }} />

            <Grid.Column width={16}>
              <Header
                floated='left'
                content='経験した業界'
                icon='address book outline'
              />
            </Grid.Column>
            <Grid.Column width={16}>
              <Item
                className='ui  tag label'
                content={profile?.industry}
                style={{ fontSize: 15, marginLeft: 50 }}
              />
            </Grid.Column>
            <hr style={{ width: 750 }} />

            <Grid.Column width={16}>
              <Header floated='left' content='職務経歴' icon='address book' />
            </Grid.Column>

            <Grid.Column width={16}>
              <Card floated='left' style={{ marginLeft: 40, width: "90%" }}>
                <Card.Content>
                  <Card.Header content={profile.careerCompany || ""} />
                  <Card.Meta>
                    <div>{`${profile.careerStartYear ||""}年${profile.careerStartMonth || ""}月〜${profile.careerFinishYear || ""}年${profile.careerFinishMonth || ""}月` || ""}</div>
                    <div>{`部署：${profile.careerDepartment || ""}`}</div>
                    <div>{`役職：${profile.careerPosition || ""}`}</div>
                  </Card.Meta>
                  <Card.Description>
                    {profile.careerDescription || ""}
                  </Card.Description>
                </Card.Content>
              </Card>
            </Grid.Column>
          </>
        )}
      </Grid>
    </Tab.Pane>
  );
}
