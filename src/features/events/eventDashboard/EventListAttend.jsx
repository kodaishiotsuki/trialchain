import React from "react";
import { Link } from "react-router-dom";
import { List, Image } from "semantic-ui-react";

export default function EventListAttend({ attendee }) {
  return (
    <>
      <List.Item as={Link} to={`/profile/${attendee.id}`}>
        <Image
          circular
          src={attendee.photoURL || "/assets/user.png"}
          style={{ width: 50 }}
        />
      </List.Item>
    </>
  );
}
