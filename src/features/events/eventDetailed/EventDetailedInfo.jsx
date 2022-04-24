import React, { useEffect, useState } from "react";
import { Button, Grid, Header, Segment } from "semantic-ui-react";
import { addUserFavoriteCompany } from "../../../app/firestore/firestoreService";
import {
  arrayRemove,
  collection,
  doc,
  getDocs,
  getFirestore,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { app } from "../../../app/config/firebase";
import { getAuth } from "firebase/auth";

export default function EventDetailedInfo({ event, isHost }) {
  // const { authenticated } = useSelector((state) => state.auth);
  // const [mapOpen, setMapOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [userType, setUserType] = useState([]);
  //firebase
  const db = getFirestore(app);
  const auth = getAuth(app);
  const user = auth.currentUser;

  //企業と求職者のタイプを取得
  useEffect(() => {
    try {
      const q = query(
        collection(db, "users"),
        where("email", "==", user.email)
      );
      getDocs(q).then((querySnapshot) => {
        setUserType(querySnapshot.docs.map((doc) => doc.data())[0]);
        //コンソールで表示
        // console.log(querySnapshot.docs.map((doc) => doc.data())[0].userUid);
      });
    } catch (error) {
      console.log(error.message);
    }
  });

  //企業のお気に入り登録
  async function handleUserFavoriteCompany() {
    setLoading(true);
    try {
      await addUserFavoriteCompany(event);
    } catch (error) {
      console.log("fserror", error);
      throw error;
    } finally {
      setLoading(false);
    }
  }
  //お気に入り企業解除
  async function deleteFavoriteCompany() {
    setDeleteLoading(true);
    try {
      await updateDoc(doc(db, "events", event.id), {
        favoriteUserId: arrayRemove(user.uid),
      });
      return updateDoc(doc(db, "users", user.uid), {
        favoriteCompanyId: arrayRemove(event.id),
      });
    } catch (error) {
      console.log("fserror", error);
      throw error;
    } finally {
      setDeleteLoading(false);
    }
  }

  return (
    <Segment.Group>
      <Segment
        textAlign='center'
        style={{ border: "none" }}
        attached='top'
        secondary
        inverted
        color='teal'
      >
        <h2>{event.title}とは</h2>
      </Segment>
      <Segment>
        <Grid>
          {/* <Grid.Column width={1}>
            <Icon size='large' color='teal' name='info' />
          </Grid.Column> */}
          <Grid.Column width={16}>
            <Header
              attached='top'
              style={{ textAlign: "center" }}
              content='MISSION'
              as='h3'
            />
            <Header
              attached
              style={{ textAlign: "center" }}
              content={event.mission}
              as='h3'
            />
            <Header
              attached='top'
              style={{ textAlign: "center" }}
              content='VISION'
              as='h3'
            />
            <Header
              attached
              style={{ textAlign: "center" }}
              content={event.vision}
              as='h3'
            />
            <Header
              attached='top'
              style={{ textAlign: "center" }}
              content='VALUE'
              as='h3'
            />
            <Header
              attached
              style={{ textAlign: "center" }}
              content={event.value}
              as='h3'
            />
            {/* <p>{event.description}</p> */}
          </Grid.Column>
        </Grid>
      </Segment>

      {/* <Segment attached>
        <Grid verticalAlign='middle'>
          <Grid.Column width={1}>
            <Icon name='building' size='large' color='teal' />
          </Grid.Column>
          <Grid.Column width={15}>
            <span>{format(event.date, "YYYY/MM/DD ")}</span>
          </Grid.Column>
        </Grid>
      </Segment> */}

      {/* <Segment attached>
        <Grid verticalAlign='middle'>
          <Grid.Column width={1}>
            <Icon name='users' size='large' color='teal' />
          </Grid.Column>
          <Grid.Column width={15}>
            <Label
              className='ui teal tag label'
              content={event.career[0]}
              style={{ marginRight: 25, fontSize: 15 }}
            />
            <Label
              className='ui teal tag label'
              content={event.career[1]}
              style={{ marginRight: 25 }}
            />
            <Label
              className='ui teal tag label'
              content={event.career[2]}
              style={{ marginRight: 25 }}
            />
          </Grid.Column>
        </Grid>
      </Segment> */}

      {/* 地図 */}
      {/* <Segment attached>
        <Grid verticalAlign='middle'>
          <Grid.Column width={1}>
            <Icon name='marker' size='large' color='teal' />
          </Grid.Column>
          <Grid.Column width={11}>
            <span>{event.venue.address}</span>
          </Grid.Column>
          <Grid.Column width={4}>
            <Button
              onClick={() => setMapOpen(!mapOpen)}
              color='teal'
              content={mapOpen ? "地図を隠す" : "地図を開く"}
              disabled={!authenticated}
            />
          </Grid.Column>
        </Grid>
      </Segment>
      {mapOpen && <EventDetailedMap latLng={event.venue.latLng} />} */}

      <Segment attached='bottom' clearing>
        {/* 求職者のみ表示 */}
        {userType.userType === "求職者" && (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button
              color='orange'
              floated='left'
              style={{
                fontSize: 25,
                marginRight: 50,
              }}
              onClick={handleUserFavoriteCompany}
              loading={loading}
            >
              お気に入り登録
            </Button>
            <Button
              floated='right'
              content='お気に入り解除'
              style={{
                fontSize: 25,
              }}
              loading={deleteLoading}
              onClick={deleteFavoriteCompany}
            />
          </div>
        )}
      </Segment>
    </Segment.Group>
  );
}
