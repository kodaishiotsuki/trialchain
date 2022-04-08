import React from "react";

import { Link } from "react-router-dom";
import { Button, Card, Header, Image } from "semantic-ui-react";


export default function TrialUserListItem({ users }) {
  // const [loading, setLoading] = useState(false);

  // const db = getFirestore(app);
  // const auth = getAuth(app);
  // const currentUser = auth.currentUser;

  // const userId = users.map((uId) => {
  //   console.log(uId.userId)
  //   return uId.userId;
  // })


  //トライアル申請者リスト取得
  // useEffect(() => {
  //   try {
  //     const q = query(
  //       doc(db, "trialCompany", currentUser.uid, "users"),
  //       where("hostUid", "==", currentUser.uid)
  //     );
  //     getDoc(q).then((querySnapshot) => {
  //       setUsers(
  //         querySnapshot.docs.map((doc) =>
  //           doc.data({ ...doc.data(), id: doc.id })
  //         )
  //       );

  //       //コンソールで表示
  //       // console.log(querySnapshot.docs.map((doc) => doc.data()));
  //     });
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // }, [db, currentUser.uid]);

  return (
    <Card.Group itemsPerRow={3} style={{ marginTop: 30 }}>
      {users.map((user) => (
        <Card key={user.id}>
          <Card.Content>
            <Image size='large' src={user.userPhotoURL} />
            <Header size='huge'>{user.userName}</Header>
            {/* <Button
              floated='right'
              negative
              content='トライアル承認'
              loading={loading}
            /> */}
            <Button
              floated='right'
              positive
              content='トライアル承認'
              as={Link}
              to={`/trialUserProfile/${user.userId}`}
              style={{fontSize:20}}
            />
          </Card.Content>
        </Card>
      ))}
    </Card.Group>
  );
}
