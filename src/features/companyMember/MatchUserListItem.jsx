import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Card, Header, Image } from "semantic-ui-react";
import { app } from "../../app/config/firebase";

export default function MatchUserListItem({ matchUser, currentUser }) {
  const db = getFirestore(app);
  const [groupId, setGroupId] = useState("");

  console.log(matchUser?.userId);
  console.log(currentUser?.uid);

  useEffect(() => {
    try {
      const q = query(
        collection(db, "group"),
        where("userId", "==", matchUser?.userId),
        where("attendeeIds", "array-contains", currentUser?.uid)
      );
      getDocs(q).then((querySnapshot) => {
        setGroupId(
          querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))[0]
            ?.id
        );
        //コンソールで表示
        console.log(
          querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))[0]
            ?.id
        );
      });
    } catch (error) {
      console.log(error.message);
    }
  }, [db, matchUser?.userId, currentUser?.uid]);

  return (
    <Card>
      <Card.Content>
        <Image
          size='large'
          src={matchUser.userPhotoURL || "/assets/user.png"}
        />
        <Header size='huge'>{matchUser.userName}</Header>
        <Button
          floated='right'
          color='teal'
          content='チャット画面へ'
          style={{ fontSize: 15 }}
          as={Link}
          to={`/chat/${groupId}`}
        />
      </Card.Content>
    </Card>
  );
}
