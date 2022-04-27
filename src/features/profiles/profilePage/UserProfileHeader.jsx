import React from "react";
import { Grid, Header, Icon, Item, Segment } from "semantic-ui-react";

export default function UserProfileHeader({ profile }) {
  return (
    <Segment>
      <Grid>
        <Grid.Column width={8}>
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
        <Grid.Column width={4} verticalAlign='middle'>
          <div>
            <a href={profile.twitterURL}>
              <Icon size='big' color='teal' name='twitter' />
            </a>
            <a href={profile.facebookURL}>
              <Icon size='big' color='teal' name='facebook square' />
            </a>
            <a href={profile.gitHubURL}>
              <Icon size='big' color='teal' name='github' />
            </a>
            <a href={profile.noteURL}>
              <Icon size='big' color='teal' name='sticky note outline' />
            </a>
          </div>
        </Grid.Column>
      </Grid>
    </Segment>
  );
}
