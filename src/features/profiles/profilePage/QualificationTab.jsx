import React, { useState } from "react";
import { Button, Card, Grid, Header, Item, Tab } from "semantic-ui-react";
import QualificationForm from "./QualificationForm";

export default function QualificationTab({ profile, isCurrentUser }) {
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
            <QualificationForm profile={profile} />
          </Grid.Column>
        ) : (
          <>
            <Grid.Column width={16}>
              <Header floated='left' content='学歴' icon='address book' />
            </Grid.Column>

            <Grid.Column width={16}>
              <Card floated='left' style={{ marginLeft: 40, width: "90%" }}>
                <Card.Content>
                  <Card.Header
                    content={`最終学歴：${profile.educationalBackground || ""}`}
                  />
                  <Card.Header
                    content={`学校名：${
                      profile.educationalBackgroundName || ""
                    }`}
                  />
                  <Card.Meta>
                    <div>
                      {`${profile.yearOfAdmission || ""}年〜${
                        profile.yearOfGraduation || ""
                      }年`}
                    </div>
                    <div>{`学部/専攻：${profile.undergraduate || ""}`}</div>
                    <div>{`学科：${profile.undergraduateCourse || ""}`}</div>
                  </Card.Meta>
                </Card.Content>
              </Card>
            </Grid.Column>
            <Grid.Column width={16}>
              <Header
                floated='left'
                content='言語'
                icon='address book'
                as='h3'
              />
            </Grid.Column>
            <Grid.Column width={16}>
              <Item
                className='ui  tag label'
                content={`${profile?.language || ""} （${
                  profile?.languageLevel || ""
                }）`}
                style={{ marginLeft: 50, fontSize: 15 }}
              />
            </Grid.Column>
            <hr style={{ width: 750 }} />

            <Grid.Column width={16}>
              <Header
                floated='left'
                content='保有資格'
                icon='address book outline'
              />
            </Grid.Column>
            <Grid.Column width={16}>
              <Item
                className='ui  tag label'
                content={profile?.license || ""}
                style={{ fontSize: 15, marginLeft: 50 }}
              />
            </Grid.Column>
          </>
        )}
      </Grid>
    </Tab.Pane>
  );
}
