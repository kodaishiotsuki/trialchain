import { getAuth } from "firebase/auth";
import {
  collection,
  getFirestore,
  limit,
  orderBy,
  query,
  startAfter,
  Timestamp,
  where,
} from "firebase/firestore";
import { app } from "../config/firebase";

const db = getFirestore(app);
const auth = getAuth(app);

//firestoreから取得するデータ型を決める
export function dataFromSnapshot(snapshot) {
  if (!snapshot.exists) return undefined;
  const data = snapshot.data();

  //日付(timestampをJSに変換)
  for (const prop in data) {
    if (data.hasOwnProperty(prop)) {
      if (data[prop] instanceof Timestamp) {
        data[prop] = data[prop].toDate();
      }
    }
  }

  return {
    ...data,
    id: snapshot.id,
  };
}

//meetysコレクションのwhere句(フィルター機能)
export function fetchMeetysFromFirestore(
  filter,
  startDate,
  pageSize,
  lastDocSnapshot = null
) {
  const user = auth.currentUser;
  const q = query(
    collection(db, "meety"),
    orderBy("createdAt", "desc"),
    startAfter(lastDocSnapshot),
    limit(pageSize)
  );
  switch (filter) {
    case "エンジニア":
      return query(q, where("career", "array-contains", "エンジニア"));
    case "デザイナー":
      return query(q, where("career", "array-contains", "デザイナー"));
    case "セールス":
      return query(q, where("career", "array-contains", "セールス"));
    case "カスタマーサクセス":
      return query(q, where("career", "array-contains", "カスタマーサクセス"));
    case "PM・Webディレクション":
      return query(
        q,
        where("career", "array-contains", "PM・Webディレクション")
      );
    case "編集・ライティング":
      return query(q, where("career", "array-contains", "編集・ライティング"));
    case "マーケティング・PR":
      return query(q, where("career", "array-contains", "マーケティング・PR"));
    case "コンサルティング":
      return query(q, where("career", "array-contains", "コンサルティング"));
    // case "経理":
    //   return query(q, where("career", "array-contains", "経理"));
    case "isHosting":
      return query(q, where("hostUid", "==", user.uid));
    default:
      return query(q);
  }
}
