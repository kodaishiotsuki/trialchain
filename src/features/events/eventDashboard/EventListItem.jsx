import React from "react";
import {
  Button,
  Icon,
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
              style={{ maxHeight: 170, width: 330 }}
            />
            <Item.Content>
              <Item.Header content={event.title} size='large' />
              <br />
              <Label
                style={{ top: "-45px" }}
                ribbon='right'
                color='orange'
                content={`トライアル期間：${event.trialMonth}ヶ月`}
              />

              <Item.Header
                content={`一緒に働きたい＆求めている人材`}
                style={{ fontSize: 15 }}
              />
              <Item.Content
                className='ui  tag label'
                content={event.career[0]}
                style={{ margin: 5 }}
              />
              <Item.Content
                className='ui  tag label'
                content={event.career[1]}
                style={{ margin: 5 }}
              />
              <Item.Content
                className='ui  tag label'
                content={event.career[2]}
                style={{ margin: 5 }}
              />
              <Item.Description style={{ fontSize: 15, fontWeight: "bold" }}>
                創業者：
                <Link to={`/profile/${event.hostUid}`}> {event.hostedBy}</Link>
              </Item.Description>

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
      <Segment>
        <span>
          {/* <Icon name='building' />
          {format(event.date, "YYYY/MM/DD ")}
          <br /> */}
          <Icon name='marker' />
          {event.venue.address}
        </span>
      </Segment>
      <Segment secondary>
        <List horizontal>
          {event.attendees.map((attendee) => (
            <EventListAttend key={attendee.id} attendee={attendee} />
          ))}
        </List>
      </Segment>
      <Segment clearing>
        <div>{event.description}</div>
        {/* <Button
          onClick={() => deleteEventInFirestore(event.id)}
          color='red'
          floated='right'
          content='Delete'
        /> */}
        <Button
          as={Link}
          to={`/events/${event.id}`} //イベント内容詳細ページへ遷移（idで判断）
          color='teal'
          floated='right'
          content='View'
          disabled={!authenticated}
        />
      </Segment>
    </Segment.Group>
  );
}
