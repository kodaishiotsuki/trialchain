import React from "react";
import { Link } from "react-router-dom";
import { Card, Icon } from "semantic-ui-react";

export default function CompanyHomeContent() {
  return (
    <Card.Group>
      <Card
        style={{ padding: 30, width: 240, height: 220 }}
        as={Link}
        to='/createEvent'
      >
        <Card.Content>
          <Icon
            name='building'
            size='huge'
            style={{ marginLeft: "33%", marginBottom: 40 }}
          />
          <Card.Header style={{ textAlign: "center", fontSize: 25 }}>
            企業リスト
          </Card.Header>
        </Card.Content>
      </Card>
      <Card
        style={{ padding: 30, width: 240, height: 220 }}
        as={Link}
        to='/createEvent'
      >
        <Card.Content>
          <Icon
            name='edit outline'
            size='huge'
            style={{ marginLeft: "33%", marginBottom: 40 }}
          />
          <Card.Header style={{ textAlign: "center", fontSize: 25 }}>
            求人の掲載
          </Card.Header>
        </Card.Content>
      </Card>
      <Card
        style={{ padding: 30, width: 240, height: 220 }}
        as={Link}
        to='/createEvent'
      >
        <Card.Content>
          <Icon
            name='edit '
            size='huge'
            style={{ marginLeft: "33%", marginBottom: 40 }}
          />
          <Card.Header style={{ textAlign: "center", fontSize: 25 }}>
            求人の更新
          </Card.Header>
        </Card.Content>
      </Card>

      <Card
        style={{ padding: 30, width: 240, height: 220 }}
        as={Link}
        to='/createEvent'
      >
        <Card.Content>
          <Icon
            name='users'
            size='huge'
            style={{ marginLeft: "30%", marginBottom: 40 }}
          />
          <Card.Header style={{ textAlign: "center", fontSize: 25 }}>
            求職者リスト
          </Card.Header>
        </Card.Content>
      </Card>
      <Card
        style={{ padding: 30, width: 240, height: 220 }}
        as={Link}
        to='/createEvent'
      >
        <Card.Content>
          <Icon
            name='user outline'
            size='huge'
            style={{ marginLeft: "30%", marginBottom: 40 }}
          />
          <Card.Header style={{ textAlign: "center", fontSize: 25 }}>
            応募者確認
          </Card.Header>
        </Card.Content>
      </Card>
      <Card
        style={{ padding: 30, width: 240, height: 220 }}
        as={Link}
        to='/createEvent'
      >
        <Card.Content>
          <Icon
            name='paper plane'
            size='huge'
            style={{ marginLeft: "30%", marginBottom: 40 }}
          />
          <Card.Header style={{ textAlign: "center", fontSize: 25 }}>
            オファー
          </Card.Header>
        </Card.Content>
      </Card>
      <Card
        style={{ padding: 30, width: 240, height: 220 }}
        as={Link}
        to='/createEvent'
      >
        <Card.Content>
          <Icon
            name='envelope'
            size='huge'
            style={{ marginLeft: "33%", marginBottom: 40 }}
          />
          <Card.Header style={{ textAlign: "center", fontSize: 25 }}>
            メッセージ
          </Card.Header>
        </Card.Content>
      </Card>
      <Card
        style={{ padding: 30, width: 240, height: 220 }}
        as={Link}
        to='/createEvent'
      >
        <Card.Content>
          <Icon
            name='heart outline'
            size='huge'
            style={{ marginLeft: "33%", marginBottom: 40 }}
          />
          <Card.Header style={{ textAlign: "center", fontSize: 25 }}>
            トライアル
          </Card.Header>
        </Card.Content>
      </Card>
      <Card
        style={{ padding: 30, width: 240, height: 220 }}
        as={Link}
        to='/createEvent'
      >
        <Card.Content>
          <Icon
            name='address card'
            size='huge'
            style={{ marginLeft: "33%", marginBottom: 40 }}
          />
          <Card.Header style={{ textAlign: "center", fontSize: 25 }}>
            プロフィール
          </Card.Header>
        </Card.Content>
      </Card>
    </Card.Group>
  );
}
