import { getAuth } from "firebase/auth";
import { doc, getFirestore, setDoc } from "firebase/firestore";
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

export default function TrialListItem({ company }) {
  //FB
  const db = getFirestore(app);
  const auth = getAuth(app);
  const user = auth.currentUser;
  //loading
  const [loading, setLoading] = useState(false);
  //トライアル申請ボタン
  const [buttonClick, setButtonClick] = useState(false);

  //トライアル申請
  async function UserTrialRequestCompany() {
    setLoading(true);
    try {
      await setDoc(
        doc(db, "trialCompany", company.hostUid, "users", user.uid),
        {
          ...company,
          userName: user.displayName,
          userPhotoURL: user.photoURL || "/assets/user.png",
          userId: user.uid,
        }
      );
      await setDoc(
        doc(db, "trialUser", user.uid, "companies", company.hostUid),
        {
          ...company,
          userName: user.displayName,
          userPhotoURL: user.photoURL || "/assets/user.png",
          userId: user.uid,
        }
      );
    } catch (error) {
      console.log("fserror", error);
      throw error;
    } finally {
      setButtonClick(true);
      setLoading(false);
    }
  }

  return (
    <Segment.Group style={{ width: 900, margin: "auto", marginTop: 20 }}>
      <Segment>
        <Item.Group>
          <Item style={{ height: 120 }}>
            <Image
              size='tiny'
              rounded
              src={`/assets/categoryImages/${company.category}.jpg`}
              style={{ maxHeight: 130, width: 330 }}
            />
            <Item.Content>
              <Item.Header
                content={company.title}
                style={{ fontSize: 35, marginTop: 20 }}
              />
              <br />
              <Label
                style={{ top: "-55px", fontSize: 15 }}
                ribbon='right'
                color='orange'
                content={`トライアル期間：${company.trialMonth}ヶ月`}
              />
              <br />
              <Icon name='tag' />
              <Item.Header
                content='一緒に働きたい＆求めている人材'
                style={{ fontSize: 20, marginRight:20  }}
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
              {/* <Item.Content
                className='ui teal tag label'
                content={company.career[1]}
              ></Item.Content>
              <Item.Content
                className='ui teal tag label'
                content={company.career[2]}
              ></Item.Content> */}
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
          content={buttonClick ? "申請済み" : "トライアル申請"}
          style={{
            fontSize: 15,
            marginLeft: 15,
            marginTop: 15,
          }}
          loading={loading}
          onClick={UserTrialRequestCompany}
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
