import { getAuth } from "firebase/auth";
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Button, Container, Header, Icon, Segment } from "semantic-ui-react";
import { app } from "../../app/config/firebase";

export default function HomePage({ history }) {
  //ユーザータイプ
  const [userType, setUserType] = useState([]);
  const db = getFirestore(app);
  const auth = getAuth(app);
  //ログインユーザー
  const user = auth.currentUser;

  //
  useEffect(() => {
    try {
      const q = query(
        collection(db, "users"),
        where("email", "==", user?.email)
      );
      getDocs(q).then((querySnapshot) => {
        setUserType(querySnapshot.docs.map((doc) => doc.data())[0]);

        //コンソールで表示
        // console.log(querySnapshot.docs.map((doc) => doc.data())[0]);
      });
    } catch (error) {
      console.log(error.message);
    }
  }, [db, user?.email]);
  return (
    <Segment inverted textAlign='center' vertical className='masthead'>
      <Container>
        <Header as='h1' inverted>
          <Icon name='chain' />
          Trial Chain
        </Header>

        {/* history.push→アクションを起こした時にページ遷移 */}
        {userType.userType === "求職者" ? (
          <Button onClick={() => history.push("/events")} size='huge' inverted>
            Get started
            <Icon name='right arrow' inverted />
          </Button>
        ) : (
          <Button
            onClick={() => history.push("/companyHome")}
            size='huge'
            inverted
          >
            Get started
            <Icon name='right arrow' inverted />
          </Button>
        )}
      </Container>
    </Segment>
  );
}
