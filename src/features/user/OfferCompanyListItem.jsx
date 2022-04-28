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
import {
  Button,
  Icon,
  Image,
  Item,
  Label,
  List,
  Segment,
} from "semantic-ui-react";
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
    // <Segment.Group style={{ width: 900, margin: "auto", marginTop: 20 }}>
    <Segment.Group style={{ width: 700, marginTop: 0 }}>
      <Segment>
        <Item.Group>
          <Item>
            <Image
              size='tiny'
              rounded
              src={`/assets/categoryImages/${company.category}.jpg`}
              style={{ maxHeight: 200, width: 330 }}
            />
            <Item.Content>
              <Item.Header
                content={company.title}
                style={{ fontSize: 25, marginTop: 50 }}
              />
              <br />
              <Label
                style={{ top: "-80px", fontSize: 15 }}
                ribbon='right'
                color='orange'
                content={`トライアル期間：${company.trialMonth}ヶ月`}
              />
              <br />
              <Item.Header
                content='一緒に働きたい人材'
                style={{ fontSize: 20, marginRight: 20 }}
                icon='tags'
              />
              {/* <br /> */}
              <Item.Content
                className='ui teal tag label'
                content={company.career[0]}
                style={{
                  fontSize: 15,
                  marginTop: 5,
                  paddingRight: 35,
                  paddingLeft: 35,
                }}
              ></Item.Content>
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
      <Segment>
        <span>
          <Icon name='marker' />
          {company.venue.address}
        </span>
      </Segment>
      <Segment clearing style={{ maxHeight: 90 }}>
        <List floated='left' style={{ display: "flex" }}>
          {company.attendees.map((member) => (
            <List.Item
              key={member.id}
              as={Link}
              to={`/profile/${member.id}`}
              floated='left'
            >
              <Image
                circular
                src={member.photoURL || "/assets/user.png"}
                style={{ width: 60, marginRight: 15 }}
              />
            </List.Item>
          ))}
        </List>
        <Button
          color='teal'
          floated='right'
          content={buttonClick ? "オファー済み" : "オファーを受ける"}
          style={{
            fontSize: 15,
            marginLeft: 15,
            marginTop: 15,
          }}
          loading={loading}
          onClick={receiveOfferFromCompany}
          disabled={buttonClick}
        />
        <Button
          as={Link}
          to={`/events/${company.id}`}
          floated='right'
          content='詳細を見る'
          style={{
            fontSize: 15,
            marginTop: 15,
          }}
        />
      </Segment>
    </Segment.Group>
  );
}
