import React from "react";
import MeetyListItem from "./MeetyListItem";

export default function MeetyList({ meetys, loading }) {
  return (
    <>
        {meetys.map((meety) => (
          <MeetyListItem key={meety.id} meety={meety} loading={loading} />
        ))}
    </>
  );
}
