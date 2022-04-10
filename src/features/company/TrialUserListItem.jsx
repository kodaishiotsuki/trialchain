import React from "react";
import { Link } from "react-router-dom";
import { Button, Card, Header, Image } from "semantic-ui-react";

export default function TrialUserListItem({ requestUser }) {
  return (
    <Card>
      <Card.Content>
        <Image size='large' src={requestUser.userPhotoURL} />
        <Header size='huge'>{requestUser.userName}</Header>
        <Button
          floated='right'
          positive
          content='詳細ページへ'
          as={Link}
          to={`/trialUserProfile/${requestUser.userId}`}
          style={{ fontSize: 20 }}
        />
      </Card.Content>
    </Card>
  );
}
