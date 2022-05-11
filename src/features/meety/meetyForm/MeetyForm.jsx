import { getAuth } from "firebase/auth";
import {
  collection,
  doc,
  getDocs,
  getFirestore,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, Form, Header, Icon, Segment } from "semantic-ui-react";
import { app } from "../../../app/config/firebase";

export default function MeetyForm() {
  const history = useHistory();
  const db = getFirestore(app);
  const auth = getAuth(app);
  const currentUser = auth.currentUser;
  const [loading, setLoading] = useState(false);
  //ログインユーザー
  const [loginUser, setLoginUser] = useState([]);
  //自分の会社を取得
  const [myCompany, setMyCompany] = useState([]);

  //ログインユーザーを取得
  useEffect(() => {
    try {
      const q = query(
        collection(db, "users"),
        where("email", "==", currentUser?.email)
      );
      getDocs(q).then((querySnapshot) => {
        setLoginUser(
          querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))[0]
        );
        //コンソールで表示
        // console.log(
        //   querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))[0]
        // );
      });
    } catch (error) {
      console.log(error.message);
    }
  }, [db, currentUser?.email]);

  //自分の会社を取得
  useEffect(() => {
    try {
      const q = query(
        collection(db, "events"),
        where("attendeeIds", "array-contains", currentUser?.uid)
      );
      getDocs(q).then((querySnapshot) => {
        setMyCompany(
          querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))[0]
        );
        //コンソールで表示
        console.log(
          querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))[0]
        );
      });
    } catch (error) {
      console.log(error.message);
    }
  }, [db, currentUser?.uid]);

  console.log(loginUser);
  // console.log(myCompany);

  const handleSubmit = async (event) => {
    setLoading(true);
    event.preventDefault();
    const { meetyTitle, meetyTime, meetyRecommendPeople, meetyDescription } =
      event.target.elements;
    await setDoc(doc(db, "meety", loginUser?.userUid), {
      meetyTitle: meetyTitle.value,
      meetyTime: meetyTime.value,
      meetyRecommendPeople: meetyRecommendPeople.value,
      meetyDescription: meetyDescription.value,
      hostOccupation:loginUser.occupation,
      hostName: loginUser.displayName,
      hostPhotoUrl: loginUser.photoURL,
      hostUid:loginUser.userUid,
      companyName: myCompany.title,
    });
    setLoading(false);
    return history.push("/companyHome");
  };;

  return (
    <Segment style={{ paddingBottom: 60 }}>
      <div style={{ textAlign: "center", marginBottom: 20, display: "flex" }}>
        <Icon name='meetup' size='huge' color='teal' />
        <h1>カジュアル面談作成</h1>
      </div>

      <Form className='ui form' onSubmit={handleSubmit}>
        <Header sub color='teal' content='タイトル' size='huge' />
        <Form.Field
          control='input'
          name='meetyTitle'
          placeholder='タイトルを入力してください'
        />
        <Header sub color='teal' content='話したい業種' size='huge' />
        <Form.Field
          control='select'
          name='meetyRecommendPeople'
          placeholder='こんな人におすすめ'
        >
          <option value='エンジニア'>エンジニア</option>
          <option value='デザイナー'>デザイナー</option>
          <option value='セールス'>セールス</option>
          <option value='カスタマーサクセス'>カスタマーサクセス</option>
          <option value='PM・Webディレクション'>PM・Webディレクション</option>
          <option value='編集・ライティング'>編集・ライティング</option>
          <option value='マーケティング・PR'>マーケティング・PR</option>
          <option value='コンサルティング'>コンサルティング</option>
        </Form.Field>

        <Header sub color='teal' content='面談時間' size='huge' />
        <Form.Field control='select' name='meetyTime'>
          <option value='15min'>15min</option>
          <option value='30min'>30min</option>
          <option value='45min'>45min</option>
          <option value='60min'>60min</option>
          <option value='75min'>75min</option>
          <option value='90min'>90min</option>
        </Form.Field>
        <Header sub color='teal' content='詳細' size='huge' />
        <Form.Field
          control='textarea'
          name='meetyDescription'
          placeholder='カジュアル面談の詳細を入力してください'
        />

        <div>
          <Button
            floated='right'
            type='submit'
            size='big'
            color='teal'
            content='登録'
            loading={loading}
          />
        </div>
      </Form>
    </Segment>
  );
}
