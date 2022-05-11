import { getAuth } from "firebase/auth";
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Card, Icon } from "semantic-ui-react";
import { app } from "../../app/config/firebase";

export default function CompanyHomeContent() {
  const { currentUserProfile } = useSelector((state) => state.profile);
  //登録した求人情報を取得
  const [hostId, setHostId] = useState("");
  const db = getFirestore(app);
  const auth = getAuth(app);
  //ログインユーザー
  const user = auth.currentUser;

  //登録した求人情報を取得(eventsコレクション)
  useEffect(() => {
    try {
      const q = query(
        collection(db, "events"),
        where("hostUid", "==", user?.uid)
      );
      getDocs(q).then((querySnapshot) => {
        setHostId(querySnapshot.docs.map((doc) => doc.data())[0]);

        //コンソールで表示
        console.log(querySnapshot.docs.map((doc) => doc.data())[0]);
      });
    } catch (error) {
      console.log(error.message);
    }
  }, [db, user?.uid]);

  return (
    <Card.Group>
      <Card
        style={{ padding: 30, width: 240, height: 220 }}
        as={Link}
        to='/events'
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
            name='edit'
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
        to={`/manage/${hostId.id}`}
      >
        <Card.Content>
          <Icon
            name='edit'
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
        to='/userList'
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
        to='/trialUserList'
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
        to='/offerUserList'
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
        to='/matchUser'
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
        to='/decidedUser'
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
        to={`/profile/${currentUserProfile?.id}`}
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
      <Card
        style={{ padding: 30, width: 240, height: 220 }}
        as={Link}
        to='/createMeety'
      >
        <Card.Content>
          <Icon
            name='meetup'
            size='huge'
            style={{ marginLeft: "33%", marginBottom: 40 }}
          />
          <Card.Header style={{ textAlign: "center", fontSize: 25 }}>
            Meety登録
          </Card.Header>
        </Card.Content>
      </Card>
    </Card.Group>
  );
}
