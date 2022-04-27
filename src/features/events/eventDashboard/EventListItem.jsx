import React from "react";
import {
  Button,
  Image,
  Item,
  Label,
  List,
  Segment,
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import EventListAttend from "./EventListAttend";
import { useSelector } from "react-redux";

export default function EventListItem({ event }) {
  const { authenticated } = useSelector((state) => state.auth);
  return (
    <Segment.Group>
      <Segment>
        <Item.Group>
          <Item>
            <Image
              size='tiny'
              rounded
              // src={event.hostPhotoURL}
              src={`/assets/categoryImages/${event.category}.jpg`}
              style={{ maxHeight: 250, width: 350 }}
            />
            <Item.Content>
              <Label
                style={{ top: "-10px", fontSize: 15 }}
                ribbon='right'
                color='orange'
                content={`トライアル期間：${event.trialMonth}ヶ月`}
              />
              <Item.Header
                content={event.title}
                style={{ fontSize: 25, paddingTop: 45 }}
              />
              <br />
              <br />
              <Item.Header
                content='一緒に働きたい人材'
                style={{ fontSize: 20, marginTop: 10 }}
              />
              <Item.Content
                className='ui teal tag label'
                content={event.career[0]}
                style={{ margin: 8, fontSize: 15 }}
              />
              {/* <Item.Content
                className='ui  tag label'
                content={event.career[1]}
                style={{ margin: 5 }}
              />
              <Item.Content
                className='ui  tag label'
                content={event.career[2]}
                style={{ margin: 5 }}
              /> */}
              {/* <Item.Description style={{ fontSize: 15, fontWeight: "bold" }}>
                創業者：
                <Link to={`/profile/${event.hostUid}`}> {event.hostedBy}</Link>
              </Item.Description> */}

              {/* {event.isCancelled && (
                <Label
                  style={{ top: "-40px" }}
                  ribbon='right'
                  color='red'
                  content='This event has been cancelled'
                />
              )} */}
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
      {/* <Segment>
        <span>
          <Icon name='building' />
          {format(event.date, "YYYY/MM/DD ")}
          <br />
          <Icon name='marker' />
          {event.venue.address}
        </span>
      </Segment> */}
      <Segment secondary>
        <List horizontal>
          {event.attendees.map((attendee) => (
            <EventListAttend key={attendee.id} attendee={attendee} />
          ))}
        </List>
      </Segment>
      <Segment clearing style={{ maxHeight: 65 }}>
        {/* <div>{event.description}</div> */}

        {/* <Button
          onClick={() => deleteEventInFirestore(event.id)}
          color='red'
          floated='right'
          content='Delete'
        /> */}

        {/* <Header
          attached='top'
          style={{ textAlign: "center" ,fontSize:15 }}
          content='MISSION'
        />
        <Header
          attached
          style={{ textAlign: "center" }}
          content={event.mission}
        />
        <Header
          attached
          style={{ textAlign: "center" }}
          content='VISION'
        />
        <Header
          attached
          style={{ textAlign: "center" }}
          content={event.vision}
        />
        <Header
          attached
          style={{ textAlign: "center" }}
          content='VALUE'
        />
        <Header
          attached
          style={{ textAlign: "center" }}
          content={event.value}
        /> */}
        <Button
          as={Link}
          to={`/events/${event.id}`} //イベント内容詳細ページへ遷移（idで判断）
          // color='teal'
          floated='right'
          content='詳細を見る'
          disabled={!authenticated}
          style={{
            fontSize: 20,
            paddingTop: 10,
            paddingBottom: 10,
            paddingLeft: 20,
            paddingRight: 20,
            marginRight: 10,
            marginBottom: 10,
          }}
        />
      </Segment>
    </Segment.Group>
  );
}
