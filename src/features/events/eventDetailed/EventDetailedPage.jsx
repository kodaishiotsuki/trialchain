import React from "react";
import { useSelector } from "react-redux";
import { Grid } from "semantic-ui-react";
import { listenToEventFromFirestore } from "../../../app/firestore/firestoreService";
import useFirestoreDoc from "../../../app/hooks/useFirestoreDoc";
import EventDetailedChat from "./EventDetailedChat";
import EventDetailedHeader from "./EventDetailedHeader";
import EventDetailedInfo from "./EventDetailedInfo";
import EventDetailedSidebar from "./EventDetailedSidebar";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { listenToSelectedEvents } from "../eventActions";

export default function EventDetailedPage({ match }) {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.auth);
  //useSelectorでstoreから呼び出し
  const event = useSelector((state) => state.event.selectedEvent);
  //loading redux
  const { loading, error } = useSelector((state) => state.async);

  //eventのホスト
  const isHost = event?.hostUid === currentUser?.uid;
  //eventの参加者（メンバー）
  const isGoing = event?.attendees?.some((a) => a.id === currentUser?.uid);

  //eventsコレクションのidに紐付ける(データの受け取り)
  useFirestoreDoc({
    query: () => listenToEventFromFirestore(match.params.id),
    data: (event) => dispatch(listenToSelectedEvents(event)),
    deps: [match.params.id, dispatch],
  });

  //loading表示
  if (loading || (!event && !error))
    return <LoadingComponent content='Loading event...' />;

  //エラーが発生した場合はリダイレクト
  if (error) return <Redirect to='/error' />;

  return (
    <Grid>
      <Grid.Column width={10}>
        <EventDetailedHeader event={event} isGoing={isGoing} isHost={isHost} />
        <EventDetailedInfo event={event} />
        <EventDetailedChat eventId={event.id} />
      </Grid.Column>
      <Grid.Column width={6}>
        <EventDetailedSidebar
          attendees={event?.attendees}
          hostUid={event.hostUid}
          event={event}
          isGoing={isGoing}
          isHost={isHost}
        />
      </Grid.Column>
    </Grid>
  );
}
