import { getAuth } from "firebase/auth";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getFirestore,
} from "firebase/firestore";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Button, Card, Header, Image } from "semantic-ui-react";
import { app } from "../../../app/config/firebase";

export default function MeetyUserListItem({ meetyUser }) {
  console.log(meetyUser);
  const [loading, setLoading] = useState(false);
  //firebase
  const db = getFirestore(app);
  const auth = getAuth(app);
  const user = auth.currentUser;
  //カジュアル面談承認ボタン
  const [buttonClick, setButtonClick] = useState(false);

  //マッチング
  async function matchMeety() {
    setLoading(true);
    try {
      //meetyGroupコレクション追加
      await addDoc(collection(db, "meetyGroup"), {
        ...meetyUser,
      });
      await deleteDoc(
        doc(db, "meetyCompany", user?.uid, "seeker", meetyUser?.seekerId)
      );
      await deleteDoc(
        doc(db, "meetySeeker", meetyUser?.seekerId, "companies", user?.uid)
      );
    } catch (error) {
      toast.error(error.message);
    } finally {
      setButtonClick(true);
      setLoading(false);
    }
  }

  return (
    <Card>
      <Card.Content>
        <div style={{ display: "flex", marginBottom: 10 }}>
          <Image
            size='small'
            src={meetyUser.seekerPhotoURL || "/assets/user.png"}
          />
          <div>
            <Header
              size='huge'
              content={meetyUser.seekerName}
              style={{ marginLeft: 10, marginTop: 40 }}
            />
          </div>
        </div>

        <div className='ui two buttons'>
          <Button
            floated='left'
            content='プロフィール'
            as={Link}
            to={`/userProfile/${meetyUser.seekerId}`}
            style={{ fontSize: 17 }}
          />
          <Button
            color='teal'
            floated='right'
            onClick={matchMeety}
            loading={loading}
            content={buttonClick ? "承認済み" : "承認する"}
            style={{ fontSize: 17 }}
            disabled={buttonClick}
          />
        </div>
      </Card.Content>
    </Card>
  );
}
