import React from "react";
import { Link } from "react-router-dom";
import { Button, Card, Header, Image } from "semantic-ui-react";

export default function MatchMettyUserListItem({ matchUser, currentUser }) {
  return (
    <Card>
      <Card.Content>
        <Image
          size='large'
          src={matchUser.seekerPhotoURL || "/assets/user.png"}
        />
        <Header size='huge'>{matchUser.seekerName}</Header>
        <Button
          floated='right'
          content='プロフィール'
          style={{ fontSize: 15, marginLeft: 25 }}
          as={Link}
          to={`/userProfile/${matchUser.seekerId}`}
        />
        <Button
          floated='right'
          color='teal'
          content='チャット画面へ'
          style={{ fontSize: 15, marginLeft: 25 }}
          as={Link}
          to={`/chat/${matchUser?.id}`}
        />
      </Card.Content>
    </Card>
  );
}
