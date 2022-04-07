import React from "react";
import { Link } from "react-router-dom";
import { Button, Card, Header, Image } from "semantic-ui-react";

export default function TrialUserListItem({ user }) {
  return (
      <Card>
        <Card.Content>
          <Image size='large' src={user.photoURL} />
          <Header size='huge'>{user.displayName}</Header>
          <Button
            floated='right'
            negative
            content='トライアル承認'
          />
          <Button
            floated='right'
            positive
            content='プロフィール'
            as={Link}
            to={`/profile/${user.userUid}`}
          />
        </Card.Content>
      </Card>
  );
}
