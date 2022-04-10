import React from "react";
import { Link } from "react-router-dom";
import { Button, Card, Header, Image } from "semantic-ui-react";

export default function TrialUserListItem({ requestUser }) {
  return (
    <Card>
      <Card.Content>
        <Image src={requestUser.userPhotoURL || "/assets/user.png"} />
        <Header size='huge'>{requestUser.userName}</Header>
        <Button
          floated='right'
          color='teal'
          content='詳細ページへ'
          as={Link}
          to={`/trialUserProfile/${requestUser.userId}`}
          style={{ fontSize: 15 }}
        />
      </Card.Content>
    </Card>
  );
}
