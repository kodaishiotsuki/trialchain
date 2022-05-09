import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Card,
  Image,
  Label,
} from "semantic-ui-react";
import { app } from "../../app/config/firebase";

export default function DecidedCompanyListItem({ company, user }) {
  // console.log(company?.hostUid);
  // console.log(user.uid);
  const db = getFirestore(app);
  const [groupId, setGroupId] = useState("");

  //個別グループID取得
  useEffect(() => {
    try {
      const q = query(
        collection(db, "group"),
        where("userId", "==", user?.uid),
        where("hostUid", "==", company?.hostUid)
      );
      getDocs(q).then((querySnapshot) => {
        setGroupId(
          querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))[0]
            ?.id
        );
        //コンソールで表示
        console.log(
          querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))[0]
            ?.id
        );
      });
    } catch (error) {
      console.log(error.message);
    }
  }, [db, company?.hostUid, user?.uid]);
  return (
    <Card>
      <Card.Content>
        <Label
          style={{ top: "-5px", fontSize: 13 }}
          ribbon='left'
          color='orange'
          content={`トライアル期間：${company.trialMonth}ヶ月`}
        />
        <Image
          floated='right'
          size='small'
          src={`/assets/categoryImages/${company.category}.jpg`}
          style={{ width: 150 }}
        />
        <br />
        <br />
        <Card.Header content={company.title} style={{ margin: 5 }} />

        <Card.Meta content='一緒に働きたい人材' style={{ margin: 5 }} />
        <Card.Content className='ui tag label' content={company.career[0]} />
      </Card.Content>
      <Card.Content extra>
        <div className='ui two buttons'>
          <Button
            as={Link}
            to={`/events/${company.id}`}
            floated='right'
            content='詳細を見る'
          />
          <Button
            as={Link}
            to={`/chat/${groupId}`}
            color='teal'
            floated='right'
            content='チャット画面へ'
          />
        </div>
      </Card.Content>
    </Card>
  );
}
