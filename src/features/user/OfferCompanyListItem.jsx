import { getAuth } from "firebase/auth";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getFirestore,
  setDoc,
} from "firebase/firestore";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Card, Image, Label } from "semantic-ui-react";
import { app } from "../../app/config/firebase";

export default function OfferCompanyListItem({ company }) {
  console.log(company);
  //FB
  const db = getFirestore(app);
  const auth = getAuth(app);
  const user = auth.currentUser;
  //loading
  const [loading, setLoading] = useState(false);
  //トライアル申請ボタン
  const [buttonClick, setButtonClick] = useState(false);

  console.log(user);

  //企業からのオファー了承
  async function receiveOfferFromCompany() {
    setLoading(true);
    try {
      await setDoc(
        doc(db, "matchOfferCompany", company.hostUid, "users", user.uid),
        {
          ...company,
          userName: user.displayName,
          userPhotoURL: user.photoURL || "/assets/user.png",
          userId: user.uid,
        }
      );
      await setDoc(
        doc(db, "matchOfferUser", user.uid, "companies", company.hostUid),
        {
          ...company,
          userName: user.displayName,
          userPhotoURL: user.photoURL || "/assets/user.png",
          userId: user.uid,
        }
      );
      //offerUser,offerCompany削除
      await deleteDoc(
        doc(db, "offerCompany", company.hostUid, "users", user.uid)
      );
      await deleteDoc(
        doc(db, "offerUser", user.uid, "companies", company.hostUid)
      );
      //groupコレクション追加
      await addDoc(collection(db, "group"), {
        ...company,
        userName: user.displayName,
        userPhotoURL: user.photoURL || "/assets/user.png",
        userId: user.uid,
      });
    } catch (error) {
      console.log("fserror", error);
      throw error;
    } finally {
      setButtonClick(true);
      setLoading(false);
    }
  }

  return (
    <Card>
      <Card.Content>
        <Label
          style={{ top: "-5px", fontSize: 13 }}
          ribbon='left'
          color='orange'
          content={`トライアル期間：${company.trialMonth}ヶ月`}
        />
        <Image
          floated='right'
          size='small'
          src={`/assets/categoryImages/${company.category}.jpg`}
          style={{ width: 150 }}
        />
        <br />
        <br />
        <Card.Header content={company.title} style={{ margin: 5 }} />

        <Card.Meta content='一緒に働きたい人材' style={{ margin: 5 }} />
        <Card.Content className='ui tag label' content={company.career[0]} />
      </Card.Content>
      <Card.Content extra>
        <div className='ui two buttons'>
          <Button
            as={Link}
            to={`/events/${company.id}`}
            floated='right'
            content='詳細を見る'
          />
          <Button
            color='teal'
            floated='right'
            content={buttonClick ? "オファー済み" : "オファーを受ける"}
            loading={loading}
            onClick={receiveOfferFromCompany}
            disabled={buttonClick}
          />
        </div>
      </Card.Content>
    </Card>
  );
}
