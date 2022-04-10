import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
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

export default function TrialResultItem({ company, user }) {
  // console.log(company?.hostUid);
  // console.log(user.uid);
  const db = getFirestore(app);
  const [groupId, setGroupId] = useState("");

  //個別グループID取得
  useEffect(() => {
    try {
      const q = query(
        collection(db, "group"),
        where("userId", "==", user?.uid),
        where("hostUid", "==", company?.hostUid),
      );
      getDocs(q).then((querySnapshot) => {
        setGroupId(
          querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))[0]
            ?.id
        );
        //コンソールで表示
        console.log(
          querySnapshot.docs.map(
            (doc) => ({ ...doc.data(), id: doc.id })
          )[0]?.id
        );
      });
    } catch (error) {
      console.log(error.message);
    }
  }, [db, company?.hostUid, user?.uid]);
  return (
    <Segment.Group>
      <>
        <Segment>
          <Item.Group>
            <Item>
              <Image
                size='tiny'
                rounded
                src={`/assets/categoryImages/${company.category}.jpg`}
                style={{ maxHeight: 150, width: 330 }}
              />
              <Item.Content>
                <Item.Header
                  content={company.title}
                  style={{ fontSize: 45, marginTop: 20 }}
                />
                <br />
                <Label
                  style={{ top: "-55px", fontSize: 20 }}
                  ribbon='right'
                  color='orange'
                  content={`トライアル期間：${company.trialMonth}ヶ月`}
                />
                <br />
                <Icon name='tag' />
                <Item.Header
                  content='一緒に働きたい＆求めている人材'
                  style={{ fontSize: 20 }}
                  icon='tags'
                />
                <br />
                <Item.Content
                  className='ui teal tag label'
                  content={company.career[0]}
                ></Item.Content>
                <Item.Content
                  className='ui teal tag label'
                  content={company.career[1]}
                ></Item.Content>
                <Item.Content
                  className='ui teal tag label'
                  content={company.career[2]}
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
                  src={member.photoURL}
                  style={{ width: 60, marginRight: 15 }}
                />
              </List.Item>
            ))}
          </List>

          <Button
            as={Link}
            //企業hostUid & ユーザーuid
            to={`/chat/${groupId}`}
            negative
            floated='right'
            content='カジュアル面談へ'
            style={{
              fontSize: 20,
            }}
          />
        </Segment>
      </>
    </Segment.Group>
  );
}
