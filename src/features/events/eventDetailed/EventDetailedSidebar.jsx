import { getAuth } from "firebase/auth";
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Button, Item, Label, Segment } from "semantic-ui-react";
import { app } from "../../../app/config/firebase";
import {
  addUserAttendance,
  cancelUserAttendance,
} from "../../../app/firestore/firestoreService";
import UnauthModal from "../../auth/UnauthModal";

export default function EventDetailedSidebar({
  attendees,
  hostUid,
  event,
  isGoing,
  isHost,
}) {
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const { authenticated } = useSelector((state) => state.auth);

  //ユーザータイプ
  const [userType, setUserType] = useState([]);
  const db = getFirestore(app);
  const auth = getAuth(app);

  //ログインユーザー
  const user = auth.currentUser;
  // console.log(user);

  //コレクションuser,サブコレクションcompanies取得
  useEffect(() => {
    try {
      const q = query(
        collection(db, "users"),
        where("email", "==", user.email)
      );
      getDocs(q).then((querySnapshot) => {
        setUserType(querySnapshot.docs.map((doc) => doc.data())[0]);

        //コンソールで表示
        // console.log(querySnapshot.docs.map((doc) => doc.data())[0].userType);
      });
    } catch (error) {
      console.log(error.message);
    }
  });

  //イベントに参加（会社のメンバー）
  async function handleUserJoinEvent() {
    setLoading(true);
    try {
      await addUserAttendance(event);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }
  //イベントキャンセル（会社のメンバー脱退）
  async function handleUserLeaveEvent() {
    setLoading(true);
    try {
      await cancelUserAttendance(event);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }
  return (
    <>
      {modalOpen && <UnauthModal setModalOpen={setModalOpen} />}
      <Segment
        textAlign='center'
        style={{ border: "none" }}
        attached='top'
        secondary
        inverted
        color='teal'
      >
        <h2>{attendees.length}人のメンバー</h2>
      </Segment>
      <Segment attached>
        <Item.Group relaxed divided>
          {attendees.map((attendee) => (
            <Item
              as={Link}
              to={`/profile/${attendee.id}`}
              key={attendee.id}
              style={{ position: "relative" }}
            >
              {hostUid === attendee.id && (
                <Label
                  style={{ position: "absolute" }}
                  color='orange'
                  ribbon='right'
                  content='代表者'
                />
              )}
              <Item.Image
                size='tiny'
                circular
                src={attendee.photoURL || "/assets/user.png"}
              />
              <Item.Content verticalAlign='middle'>
                <Item.Header as='h3'>
                  <span>{attendee.displayName}</span>
                </Item.Header>
              </Item.Content>
            </Item>
          ))}
        </Item.Group>
      </Segment>

      <Segment attached='bottom' clearing>
        {!isHost && userType?.userType === "企業のメンバー" && (
          <>
            {isGoing ? (
              <Button onClick={handleUserLeaveEvent} loading={loading}>
                企業から脱退
              </Button>
            ) : (
              <Button
                color='teal'
                onClick={
                  authenticated ? handleUserJoinEvent : () => setModalOpen(true) //ログイン促す
                }
                loading={loading}
              >
                企業に参加
              </Button>
            )}
          </>
        )}

        {/* イベントホストのみ編集可能 */}
        {isHost && (
          <Button
            as={Link}
            to={`/manage/${event.id}`}
            color='orange'
            floated='right'
          >
            会社情報編集
          </Button>
        )}
      </Segment>
    </>
  );
}
