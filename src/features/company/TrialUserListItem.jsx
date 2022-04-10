import React from "react";
import { Link } from "react-router-dom";
import { Button, Card, Header, Image } from "semantic-ui-react";

export default function TrialUserListItem({ user }) {
  return (
    <Card>
      <Card.Content>
        <Image size='large' src={user.userPhotoURL} />
        <Header size='huge'>{user.userName}</Header>
        <Button
          floated='right'
          positive
          content='詳細ページへ'
          as={Link}
          to={`/trialUserProfile/${user.userId}`}
          style={{ fontSize: 20 }}
        />
      </Card.Content>
    </Card>
  );
}
