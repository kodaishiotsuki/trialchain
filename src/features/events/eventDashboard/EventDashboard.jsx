import React, { useEffect, useState } from "react";
import { Grid, Loader } from "semantic-ui-react";
import EventList from "./EventList";
import { useSelector } from "react-redux";
import EventListItemPlaceholder from "./EventListItemPlaceholder";
import EventFilter from "./EventFilter";
import { fetchEvents } from "../eventActions";
import { useDispatch } from "react-redux";
import EventsFeed from "./EventsFeed";
import { RETAIN_STATE } from "../eventConstants";

const EventDashboard = () => {
  const limit = 3;
  const dispatch = useDispatch();
  const { events, moreEvents, filter, startDate, lastVisible, retainState } =
    useSelector((state) => state.event);
  const { loading } = useSelector((state) => state.async);
  const { authenticated } = useSelector((state) => state.auth);
  const [loadingInitial, setLoadingInitial] = useState(false);

  //フィルター機能初期設定
  // const [predicate, setPredicate] = useState(
  //   new Map([
  //     ["startDate", new Date()],
  //     ["filter", "all"],
  //   ])
  // );

  // const { currentUser } = useSelector((state) => state.auth);
  
  //フィルター機能イベント
  // function handleSetPredicate(key, value) {
  //   dispatch(clearEvents()); //クリーンアップ
  //   setLastDocSnapShot(null); //フィルターをリセット
  //   setPredicate(new Map(predicate.set(key, value)));
  // }

  // // DBから取得
  // useFirestoreCollection({
  //   query: () => fetchEventsFromFirestore(), //eventsコレクション
  //   data: (events) => dispatch(listenToEventFromFirestore(events)),
  //   deps: [dispatch],
  // });

  //ページング
  useEffect(() => {
    if (retainState) return; //保持状態を保つ
    setLoadingInitial(true);
    dispatch(fetchEvents(filter, startDate, limit)).then(() => {
      // setLastDocSnapShot(lastVisible);
      setLoadingInitial(false);
    });
    //アンマウント
    return () => {
      dispatch({ type: RETAIN_STATE });
    };
  }, [dispatch, filter, startDate, retainState]);

  //ボタンクリック（ページング）
  function handleFetchNextEvents() {
    dispatch(fetchEvents(filter, startDate, limit, lastVisible));
  }

  return (
    <Grid>
      <Grid.Column width={10}>
        {loadingInitial && (
          <>
            <EventListItemPlaceholder />
          </>
        )}
        <EventList
          events={events}
          getNextEvents={handleFetchNextEvents}
          loading={loading}
          moreEvents={moreEvents}
          // isHost={isHost}
        />
        {/* <Button
          loading={loading}
          disabled={!moreEvents} //最後まで行くとdisabled
          onClick={handleFetchNextEvents}
          color='green'
          content='More...'
          floated='right'
        /> */}
      </Grid.Column>
      <Grid.Column width={6}>
        {authenticated && <EventsFeed />}
        <EventFilter loading={loading} />
      </Grid.Column>
      <Grid.Column width={10}>
        <Loader active={loading} />
      </Grid.Column>
    </Grid>
  );
};
export default EventDashboard;
