import React from "react";
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

export default function TrialResultItem({ company }) {
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
                style={{ maxHeight: 150, width: 300 }}
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
                  content='求めている人材'
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
            to={`/events/${company.id}`} //イベント内容詳細ページへ遷移（idで判断）
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
