import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Grid, Icon } from "semantic-ui-react";
import { collection, getDocs, getFirestore, query } from "firebase/firestore";
import { app } from "../../../app/config/firebase";
import MeetyList from "./MeetyList";
import EventFilter from "../../events/eventDashboard/EventFilter";

export default function MeetyDashbord() {
  const { loading } = useSelector((state) => state.async);

  const db = getFirestore(app);
  //meety
  const [meetys, setMettys] = useState([]);
  //meety一覧を取得
  useEffect(() => {
    try {
      const q = query(collection(db, "meety"));
      getDocs(q).then((querySnapshot) => {
        setMettys(
          querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
        //コンソールで表示
        // console.log(
        //   querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))[0]
        // );
      });
    } catch (error) {
      console.log(error.message);
    }
  }, [db]);

  console.log(meetys);

  return (
    <>
      <div style={{ textAlign: "center", marginBottom: 20, display: "flex" }}>
        <Icon name='meetup' size='huge' color='teal' />
        <h1>カジュアル面談リスト</h1>
      </div>
      <Grid>
        <Grid.Column width={12}>
          <MeetyList meetys={meetys} loading={loading} />
        </Grid.Column>
        <Grid.Column width={4}>
          <EventFilter loading={loading} />
        </Grid.Column>
      </Grid>
    </>
  );
}
