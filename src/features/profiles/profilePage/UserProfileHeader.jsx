import React from "react";
import { Link } from "react-router-dom";
import { Button, Grid, Header, Icon, Item, Segment } from "semantic-ui-react";


export default function UserProfileHeader({ profile }) {
  return (
    <Segment>
      <Grid>
        <Grid.Column width={7}>
          <Item.Group>
            <Item>
              <Item.Image
                avatar
                size='small'
                src={profile.photoURL || "/assets/user.png"}
              />
              <Item.Content verticalAlign='middle'>
                <Header
                  style={{ display: "block", margin: 20, fontSize: 30 }}
                  content={profile.displayName}
                />
                <Item.Content
                  className='ui  tag label'
                  content={profile.occupation}
                  style={{ fontSize: 15, marginLeft: 30 }}
                />
              </Item.Content>
            </Item>
          </Item.Group>
        </Grid.Column>
        <Grid.Column width={5} verticalAlign='middle'>
          <div>
            <a href={profile.twitterURL}>
              <Icon size='huge' color='teal' name='twitter' />
            </a>
            <a href={profile.facebookURL}>
              <Icon size='huge' color='teal' name='facebook square' />
            </a>
            <a href={profile.gitHubURL}>
              <Icon size='huge' color='teal' name='github' />
            </a>
            <a href={profile.noteURL}>
              <Icon size='huge' color='teal' name='sticky note outline' />
            </a>
          </div>
        </Grid.Column>
        <Grid.Column width={4}>
          <Button
            as={Link}
            to='/userList'
            basic
            floated='right'
            content='戻る'
            style={{ fontSize: 15 }}
          />
        </Grid.Column>
      </Grid>
    </Segment>
  );
}
