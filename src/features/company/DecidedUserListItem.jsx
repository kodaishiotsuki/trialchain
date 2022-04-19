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
import TrialForm from "./TrialForm";

export default function DecidedUserListItem({ decidedUser, currentUser }) {
  const db = getFirestore(app);
  const [trial, setTrial] = useState("");
  const [formMode, setFormMode] = useState(false);

  useEffect(() => {
    try {
      const q = query(
        collection(db, "group"),
        where("userId", "==", decidedUser?.userId),
        where("hostUid", "==", currentUser?.uid)
      );
      getDocs(q).then((querySnapshot) => {
        setTrial(
          querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))[0]
        );
        //コンソールで表示
        console.log(
          querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))[0]
        );
      });
    } catch (error) {
      console.log(error.message);
    }
  }, [db, decidedUser?.userId, currentUser?.uid]);

  return (
    <>
      {formMode ? (
        <TrialForm trial={trial} />
      ) : (
        <>
          <Card>
            <Card.Content>
              <Image
                size='large'
                src={decidedUser.userPhotoURL || "/assets/user.png"}
              />
              <Header size='huge'>{decidedUser.userName}</Header>
              <Button
                floated='left'
                color='teal'
                content='チャット画面へ'
                style={{ fontSize: 15 }}
                as={Link}
                to={`/chat/${trial?.id}`}
              />
              <Button
                floated='right'
                color='orange'
                content='トライアル終了'
                style={{ fontSize: 15 }}
                onClick={() => setFormMode(true)}
                // as={Link}
                // to={`/trialForm/${currentUser?.uid}&${decidedUser?.userId}`}
              />
            </Card.Content>
          </Card>
        </>
      )}
    </>
  );
}
