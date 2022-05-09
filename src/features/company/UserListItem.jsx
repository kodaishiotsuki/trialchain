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
import { useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { Button, Card, Header, Image, Label } from "semantic-ui-react";
import { app } from "../../app/config/firebase";

export default function UserListItem({ user }) {
  //FB
  const db = getFirestore(app);
  const auth = getAuth(app);
  const currentUser = auth.currentUser;
  const [loading, setLoading] = useState(false);
  const { error } = useSelector((state) => state.async);
  const [buttonClick, setButtonClick] = useState(false);
  const [companies, setCompanies] = useState("");

  //求職者
  // console.log(user);
  //企業
  // console.log(currentUser);

  //自分の企業を取得
  useEffect(() => {
    try {
      const q = query(
        collection(db, "events"),
        where("hostUid", "==", currentUser?.uid)
      );
      getDocs(q).then((querySnapshot) => {
        setCompanies(
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
  }, [db, currentUser?.uid]);

  //エラーが発生した場合はリダイレクト
  if (error) return <Redirect to='/error' />;

  //トライアルオファー（企業からユーザーへ）
  async function companyTrialRequestUser() {
    setLoading(true);
    try {
      await setDoc(
        doc(db, "offerCompany", currentUser?.uid, "users", user?.userUid),
        {
          ...companies,
          userName: user.displayName,
          userPhotoURL: user.photoURL || "/assets/user.png",
          userId: user.userUid,
        }
      );
      await setDoc(
        doc(db, "offerUser", user?.userUid, "companies", currentUser?.uid),
        {
          ...companies,
          userName: user.displayName,
          userPhotoURL: user.photoURL || "/assets/user.png",
          userId: user.userUid,
        }
      );
    } catch (error) {
      console.log("fserror", error);
      throw error;
    } finally {
      setButtonClick(true);
      setLoading(false);
    }
  }
  return (
    <Card>
      <Card.Content>
        <div style={{ display: "flex", marginBottom: 10 }}>
          <Image size='small' src={user.photoURL || "/assets/user.png"} />
          <div>
            <Header
              size='huge'
              content={user.displayName}
              style={{ marginLeft: 10, marginTop: 40 }}
            />
            {user?.trialCompany && user?.trialMonth !== "" && (
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
            to={`/userProfile/${user.userUid}`}
            style={{ fontSize: 17 }}
          />
          <Button
            color='teal'
            floated='right'
            onClick={companyTrialRequestUser}
            loading={loading}
            content={buttonClick ? "オファー済み" : "オファーする"}
            style={{ fontSize: 17 }}
            disabled={buttonClick}
          />
        </div>
      </Card.Content>
    </Card>
  );
}
