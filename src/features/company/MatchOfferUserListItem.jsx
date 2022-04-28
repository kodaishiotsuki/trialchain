import { collection, deleteDoc, doc, getDocs, getFirestore, query, setDoc, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { Button, Card, Header, Image } from 'semantic-ui-react';
import { app } from '../../app/config/firebase';

export default function MatchOfferUserListItem({ matchUser, currentUser }) {
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

  //①matchCompany,matchUser削除
  //②decidedCompany,decidedUser追加
  async function handleCompanyTrialToUser() {
    setLoading(true);
    try {
      //①matchCompany,matchUser削除
      await deleteDoc(
        doc(db, "matchOfferCompany", currentUser?.uid, "users", matchUser?.userId)
      );
      await deleteDoc(
        doc(db, "matchOfferUser", matchUser?.userId, "companies", currentUser?.uid)
      );
      //②decidedCompany,decidedUser追加
      await setDoc(
        doc(db, "decidedCompany", currentUser?.uid, "users", matchUser?.userId),
        {
          ...trial,
        }
      );
      await setDoc(
        doc(
          db,
          "decidedUser",
          matchUser?.userId,
          "companies",
          currentUser?.uid
        ),
        {
          ...trial,
        }
      );
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
