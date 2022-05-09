import { getAuth } from "firebase/auth";
import { addDoc, collection, deleteDoc, doc, getDocs, getFirestore, query, setDoc, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Button, Card, Header, Image, Label } from "semantic-ui-react";
import { app } from "../../app/config/firebase";

export default function TrialUserListItem({ requestUser }) {
  console.log(requestUser);
  const [loading, setLoading] = useState(false);
  //firebase
  const db = getFirestore(app);
  const auth = getAuth(app);
  const user = auth.currentUser;
  //トライアル承認ボタン
  const [buttonClick, setButtonClick] = useState(false);
  //自分の会社を取得
  const [myCompany, setMyCompany] = useState([]);

  //自分の企業を取得
  useEffect(() => {
    try {
      const q = query(
        collection(db, "events"),
        where("hostUid", "==", user?.uid)
      );
      getDocs(q).then((querySnapshot) => {
        setMyCompany(
          querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))[0]
        );
        //コンソールで表示
        // console.log(
        //   querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))[0]
        // );
      }, []);
    } catch (error) {
      console.log(error.message);
    }
  }, [db, user?.uid]);

  //マッチング
  async function matchUserToCompany() {
    setLoading(true);
    try {
      await setDoc(
        doc(db, "matchCompany", user.uid, "users", requestUser.userId),
        {
          ...myCompany,
          userName: requestUser.userName,
          userPhotoURL: requestUser.userPhotoURL || "/assets/user.png",
          userId: requestUser.userId,
        }
      );
      await setDoc(
        doc(db, "matchUser", requestUser.userId, "companies", user.uid),
        {
          ...myCompany,
          userName: requestUser.userName,
          userPhotoURL: requestUser.userPhotoURL || "/assets/user.png",
          userId: requestUser.userId,
        }
      );
      await deleteDoc(
        doc(db, "trialCompany", user.uid, "users", requestUser.userId)
      );
      await deleteDoc(
        doc(db, "trialUser", requestUser.userId, "companies", user.uid)
      );
      //groupコレクション追加
      await addDoc(collection(db, "group"), {
        ...myCompany,
        userName: requestUser.userName,
        userPhotoURL: requestUser.userPhotoURL || "/assets/user.png",
        userId: requestUser.userId,
      });
    } catch (error) {
      toast.error(error.message);
    } finally {
      setButtonClick(true);
      setLoading(false);
    }
  }

  return (
    <Card>
      <Card.Content>
        <div style={{ display: "flex", marginBottom: 10 }}>
          <Image
            size='small'
            src={requestUser.userPhotoURL || "/assets/user.png"}
          />
          <div>
            <Header
              size='huge'
              content={requestUser.userName}
              style={{ marginLeft: 10, marginTop: 40 }}
            />
            {requestUser?.trialCompany && requestUser?.trialMonth !== "" && (
              <Label
                style={{ top: "5px", fontSize: 15 }}
                color='orange'
                content='トライアル採用歴あり'
              />
            )}
          </div>
        </div>

        <div className='ui two buttons'>
          <Button
            floated='left'
            content='プロフィール'
            as={Link}
            to={`/trialUserProfile/${requestUser.userId}`}
            style={{ fontSize: 17 }}
          />
          <Button
            color='teal'
            floated='right'
            onClick={matchUserToCompany}
            loading={loading}
            content={buttonClick ? "承認済み" : "承認する"}
            style={{ fontSize: 17 }}
            disabled={buttonClick}
          />
        </div>
      </Card.Content>
    </Card>
  );
}
