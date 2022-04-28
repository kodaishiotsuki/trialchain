import React from 'react'
import { Link } from 'react-router-dom';
import { Button, Card, Header, Image } from 'semantic-ui-react';

export default function OfferUserListItem({ user }) {
  console.log(user)
  return (
    <Card>
      <Card.Content>
        <Image size='large' src={user.userPhotoURL || "/assets/user.png"} />
        <Header size='huge'>{user.userName}</Header>
        <Button
          floated='right'
          color='teal'
          content='プロフィール'
          as={Link}
          to={`/userProfile/${user.userId}`}
        />
        {/* {user?.trialCompany && user?.trialMonth !== "" && (
          <Label
            style={{ top: "5px", fontSize: 15 }}
            ribbon
            color='orange'
            content='トライアル採用歴あり'
          />
        )} */}
      </Card.Content>
    </Card>
  );
}
