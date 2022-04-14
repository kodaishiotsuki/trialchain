import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { listenToGroupFromFirestore } from "../../app/firestore/firestoreService";
import useFirestoreDoc from "../../app/hooks/useFirestoreDoc";
import { listenToSelectedGroups } from "./chatActions";
import GroupDetailChat from "./GroupDetailChat";

export default function ChatPage({ match }) {
  const dispatch = useDispatch();
  // const { currentUser } = useSelector((state) => state.auth);
  //useSelectorでstoreから呼び出し
  const group = useSelector((state) => state.group.selectedGroup);
  //loading redux
  // const { loading, error } = useSelector((state) => state.async);

  // //eventのホスト
  // const isHost = event?.hostUid === currentUser?.uid;

  //groupコレクションのidに紐付ける(データの受け取り)
  useFirestoreDoc({
    query: () => listenToGroupFromFirestore(match.params.id),
    data: (group) => dispatch(listenToSelectedGroups(group)),
    deps: [match.params.id, dispatch],
  });
  // console.log(group?.id);

  return (
    <>
      <GroupDetailChat groupId={group?.id} />
    </>
  );
}
