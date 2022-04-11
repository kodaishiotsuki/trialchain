import React, { useState } from "react";
import { Segment } from "semantic-ui-react";
import UnauthModal from "../../auth/UnauthModal";
import YouTube from "react-youtube";
import style from "./Youtube.module.css";

export default function EventDetailedHeader({ event }) {
  const [modalOpen, setModalOpen] = useState(false);

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
      </Segment.Group>
    </>
  );
}
