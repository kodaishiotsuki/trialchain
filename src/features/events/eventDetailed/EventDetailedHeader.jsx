import React, { useState } from "react";
// import { Link } from "react-router-dom";
import { Segment } from "semantic-ui-react";
// import { toast } from "react-toastify";
// import {
//   addUserAttendance,
//   cancelUserAttendance,
// } from "../../../app/firestore/firestoreService";
// import { useSelector } from "react-redux";
import UnauthModal from "../../auth/UnauthModal";
import YouTube from "react-youtube";
import style from "./Youtube.module.css";

// const eventImageStyle = {
//   filter: "brightness(30%)",
// };

export default function EventDetailedHeader({ event }) {
  // const [ loading,setLoading] = useState(false);
  // const { authenticated } = useSelector((state) => state.auth);
  const [modalOpen, setModalOpen] = useState(false);

  //イベントに参加（会社のメンバー）
  // async function handleUserJoinEvent() {
  //   setLoading(true);
  //   try {
  //     await addUserAttendance(event);
  //   } catch (error) {
  //     toast.error(error.message);
  //   } finally {
  //     setLoading(false);
  //   }
  // }

  //イベントキャンセル（会社のメンバー脱退）
  // async function handleUserLeaveEvent() {
  //   setLoading(true);
  //   try {
  //     await cancelUserAttendance(event);
  //   } catch (error) {
  //     toast.error(error.message);
  //   } finally {
  //     setLoading(false);
  //   }
  // }

  const opts = {
    playerVars: {
      autoplay: 0,
      mute: 1,
      playsinline: 1,
      loop: 1,
      playlist: event.pitchId,
    },
  };
  return (
    <>
      {modalOpen && <UnauthModal setModalOpen={setModalOpen} />}
      <Segment.Group>
        <Segment
          textAlign='center'
          style={{ border: "none" }}
          attached='top'
          secondary
          inverted
          color='teal'
        >
          <h2>{event.title}の紹介動画</h2>
        </Segment>
        {/* <Segment basic attached='top' style={{ padding: "0" }}> */}
        <YouTube
          videoId={event.pitchId}
          className={style.iframe}
          containerClassName={style.youtube}
          opts={opts}
          width='5000px'
        />
        {/* <Image
            src={`/assets/categoryImages/${event.category}.jpg`}
            fluid
            style={eventImageStyle}
          /> */}

        {/* <Segment basic style={eventImageTextStyle}>
            <Item.Group>
              <Item>
                <Item.Content>
                  <Header
                    size='huge'
                    content={event.title}
                    style={{ color: "white" }}
                  />
                  <br />
                  <br />
                  <p>
                    Foundered by{" "}
                    <strong>
                      <Link to={`/profile/${event.hostUid}`}>
                        {event.hostedBy}
                      </Link>
                    </strong>
                  </p>
                </Item.Content>
              </Item>
            </Item.Group>
          </Segment> */}
        {/* </Segment> */}

        {/* <Segment attached='bottom' clearing>
          {!isHost && (
            <>
              {isGoing ? (
                <Button onClick={handleUserLeaveEvent} loading={loading}>
                  Cancel My Place
                </Button>
              ) : (
                <Button
                  color='teal'
                  onClick={
                    authenticated
                      ? handleUserJoinEvent
                      : () => setModalOpen(true) //ログイン促す
                  }
                  loading={loading}
                >
                  JOIN THIS EVENT
                </Button>
              )}
            </>
          )}

          イベントホストのみ編集可能
          {isHost && (
            <Button
              as={Link}
              to={`/manage/${event.id}`}
              color='orange'
              floated='right'
            >
              Manage Event
            </Button>
          )}
        </Segment> */}
      </Segment.Group>
    </>
  );
}
