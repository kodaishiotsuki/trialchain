import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Feed, Header, Segment } from "semantic-ui-react";
import {
  firebaseObjectToArray,
  getUserFeedRef,
} from "../../../app/firestore/firebaseService";
import { listenToFeed } from "../../profiles/profileActions";
import EventFeedItem from "./EventFeedItem";
import {  onValue } from "firebase/database";

export default function EventsFeed() {
  const dispatch = useDispatch();
  const { feed } = useSelector((state) => state.profile);

  //
  useEffect(() => {
    onValue(getUserFeedRef(), (snapshot) => {
      if (!snapshot.exists()) {
        return;
      }
      const feed = firebaseObjectToArray(snapshot.val()).reverse();
      dispatch(listenToFeed(feed));
    });
    return () => {
      // off(getUserFeedRef()); //終了
    };
  }, [dispatch]);

  return (
    <>
      <Header attached color='teal' icon='newspaper' content='News feed' />
      <Segment attached='bottom'>
        <Feed>
          {feed.map((post) => (
            <EventFeedItem post={post} key={post.id} />
          ))}
        </Feed>
      </Segment>
    </>
  );
}
