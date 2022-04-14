import {
  arrayUnion,
  collection,
  doc,
  getDocs,
  getFirestore,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Card, Header, Image } from "semantic-ui-react";
import { app } from "../../app/config/firebase";

export default function MacthUserListItemContent({ matchUser, currentUser }) {
  const db = getFirestore(app);
  const [trial, setTrial] = useState("");
  const [loading, setLoading] = useState(false);

  // console.log(matchUser?.userId);
  // console.log(currentUser?.uid);

  useEffect(() => {
    try {
      const q = query(
        collection(db, "group"),
        where("userId", "==", matchUser?.userId),
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
  }, [db, matchUser?.userId, currentUser?.uid]);

  //usersコレクションに会社情報追加
  async function handleCompanyTrialToUser() {
    setLoading(true);
    try {
      await updateDoc(doc(db, "users", matchUser?.userId), {
        trialCompany: arrayUnion(trial?.title),
        trialMonth: arrayUnion(trial?.trialMonth),
      });
    } catch (error) {
      console.log("fserror", error);
      throw error;
    } finally {
      setLoading(false);
    }
  }

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
          style={{ fontSize: 15, marginLeft: 25 }}
          as={Link}
          to={`/chat/${trial?.id}`}
        />
        <Button
          floated='right'
          color='orange'
          content='トライアル決定'
          style={{ fontSize: 15 }}
          loading={loading}
          onClick={handleCompanyTrialToUser}
        />
      </Card.Content>
    </Card>
  );
}
