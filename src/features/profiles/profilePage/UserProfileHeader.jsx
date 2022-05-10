import React from "react";
import { Link } from "react-router-dom";
import { Button, Grid, Header, Icon, Item, Segment } from "semantic-ui-react";

export default function UserProfileHeader({ profile }) {
  // console.log(profile);
  return (
    <Segment>
      <Grid>
        <Grid.Column width={7}>
          <Item.Group>
            <Item>
              <Item.Image
                avatar
                size='small'
                src={profile?.photoURL || "/assets/user.png"}
              />
              <Item.Content verticalAlign='middle'>
                <Header
                  style={{ display: "block", margin: 20, fontSize: 30 }}
                  content={profile?.displayName}
                />
              </Item.Content>
            </Item>
          </Item.Group>
        </Grid.Column>
        <Grid.Column width={5} verticalAlign='middle'>
          <div>
            <a href={profile?.twitterURL || null}>
              <Icon size='huge' color='teal' name='twitter' />
            </a>
            <a href={profile?.facebookURL || null}>
              <Icon size='huge' color='teal' name='facebook square' />
            </a>
            <a href={profile?.gitHubURL || null}>
              <Icon size='huge' color='teal' name='github' />
            </a>
            <a href={profile?.noteURL || null}>
              <Icon size='huge' color='teal' name='sticky note outline' />
            </a>
          </div>
        </Grid.Column>

        <Grid.Column width={4}>
          {profile.userType !== "求職者" ? (
            <Button
              as={Link}
              to='/userList'
              basic
              floated='right'
              content='戻る'
              style={{ fontSize: 15 }}
            />
          ) : (
            <Button
              as={Link}
              to='/events'
              basic
              floated='right'
              content='戻る'
              style={{ fontSize: 15 }}
            />
          )}
        </Grid.Column>
      </Grid>
    </Segment>
  );
}
