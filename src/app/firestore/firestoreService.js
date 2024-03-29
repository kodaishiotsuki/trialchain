import {
  getFirestore,
  collection,
  Timestamp,
  doc,
  addDoc,
  setDoc,
  getDoc,
  getDocs,
  arrayUnion,
  arrayRemove,
  updateDoc,
  query,
  orderBy,
  where,
  deleteDoc,
  serverTimestamp,
  increment,
  writeBatch,
  limit,
  startAfter,
} from "firebase/firestore";
import { getAuth, updateProfile } from "firebase/auth";
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

//eventsコレクションのwhere句(フィルター機能)
export function fetchEventsFromFirestore(
  filter,
  startDate,
  pageSize,
  lastDocSnapshot = null
) {
  const user = auth.currentUser;
  const q = query(
    collection(db, "events"),
    orderBy("date"),
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

//イベントを取得 =id（単一documentへの参照を取得）
export function listenToEventFromFirestore(eventId) {
  return doc(db, "events", eventId);
}
//グループを取得 =id（単一documentへの参照を取得）
export function listenToGroupFromFirestore(groupId) {
  return doc(db, "group", groupId);
}

//イベントコレクションとカンパニーコレクションにドキュメント追加
export function addEventToFirestore(event) {
  const user = auth.currentUser;
  return addDoc(collection(db, "events"), {
    ...event,
    hostUid: user.uid,
    hostedBy: user.displayName,
    hostPhotoURL: user.photoURL || null,
    attendees: arrayUnion({
      id: user.uid,
      displayName: user.displayName,
      photoURL: user.photoURL || null,
      occupation: user.occupation || "",
    }),
    attendeeIds: arrayUnion(user.uid),
    createdAt: serverTimestamp(),
  });
}

//イベントコレクション更新
export function updateEventInFirestore(event) {
  const eventDoc = doc(db, "events", event.id);
  return updateDoc(eventDoc, event);
}

//イベントドキュメント削除
export function deleteEventInFirestore(eventId) {
  return deleteDoc(doc(db, "events", eventId));
}

//イベントのキャンセル
export function cancelEventToggle(event) {
  const eventDoc = doc(db, "events", event.id);
  return updateDoc(eventDoc, {
    isCancelled: !event.isCancelled,
  });
}

//ユーザー情報登録
export function setUserProfileData(user) {
  return setDoc(doc(db, "users", user.uid), {
    displayName: user.displayName,
    email: user.email,
    photoURL: user.photoURL || null,
    userUid: user.uid,
    occupation: user.occupation || "",
    createdAt: serverTimestamp(),
  });
}

//ユーザー情報取得
export function getUserProfile(userId) {
  return doc(db, "users", userId);
}

//ユーザー情報更新
export async function updateUserProfile(profile) {
  const user = auth.currentUser;
  try {
    if (user.displayName !== profile.displayName) {
      updateProfile(user, {
        displayName: profile.displayName,
      });
    }
    return await updateDoc(doc(db, "users", user.uid), profile);
  } catch (error) {
    throw error;
  }
}
//ユーザー情報更新
export async function updateUserCareer(profile) {
  const user = auth.currentUser;
  try {
    return await updateDoc(doc(db, "users", user.uid), profile);
  } catch (error) {
    throw error;
  }
}
//ユーザータイプ選択
export async function UserType(profile) {
  const user = auth.currentUser;
  try {
    return await updateDoc(doc(db, "users", user.uid), {
      userType: profile.userType,
    });
  } catch (error) {
    throw error;
  }
}

//ユーザー画像保存（photoコレクションに追加）
export async function updateUserProfilePhoto(downloadURL, filename) {
  const user = auth.currentUser;
  const userDocRef = doc(db, "users", user.uid);
  try {
    const userDoc = await getDoc(userDocRef);
    if (!userDoc.data().photoURL) {
      await updateDoc(userDocRef, {
        photoURL: downloadURL,
      });
      await updateProfile(user, {
        photoURL: downloadURL,
      });
    }
    return await addDoc(collection(db, "users", user.uid, "photos"), {
      name: filename,
      url: downloadURL,
    });
  } catch (error) {
    console.log("fserror", error);
    throw error;
  }
}

//photoコレクション取得
export function getUserPhotos(userUid) {
  return collection(db, "users", userUid, "photos");
}

//メイン写真の設定
export async function setMainPhoto(photo) {
  const user = auth.currentUser;
  // const today = new Date();
  const eventDocQuery = query(
    collection(db, "events"),
    where("attendeeIds", "array-contains", user.uid)
    // where("date", "<=", today)
  );
  const userFollowingRef = collection(
    db,
    "following",
    user.uid,
    "userFollowing"
  );
  const batch = writeBatch(db);

  //写真の更新
  batch.update(doc(db, "users", user.uid), {
    photoURL: photo.url,
  });

  try {
    const eventsQuerySnap = await getDocs(eventDocQuery);
    for (let i = 0; i < eventsQuerySnap.docs.length; i++) {
      let eventDoc = eventsQuerySnap.docs[i];
      //ホストユーザーの写真更新
      if (eventDoc.data().hostUid === user.uid) {
        batch.update(eventsQuerySnap.docs[i].ref, {
          hostPhotoURL: photo.url,
        });
      }
      //attendees(メンバー)の写真更新
      batch.update(eventsQuerySnap.docs[i].ref, {
        attendees: eventDoc.data().attendees.filter((attendee) => {
          if (attendee.id === user.uid) {
            attendee.photoURL = photo.url;
          }
          return attendee;
        }),
      });
    }

    //フォローユーザーの写真更新
    const userFollowingSnap = await getDocs(userFollowingRef);
    userFollowingSnap.docs.forEach((docRef) => {
      let followingDocRef = doc(
        db,
        "following",
        docRef.id,
        "userFollowers",
        user.uid
      );
      batch.update(followingDocRef, {
        photoURL: photo.url,
      });
    });

    await batch.commit();

    return await updateProfile(user, {
      photoURL: photo.url,
    });
  } catch (error) {
    throw error;
  }
}

//ユーザー画像の削除
export function deletePhotoFromCollection(photoId) {
  const userUid = auth.currentUser.uid;
  return deleteDoc(doc(db, "users", userUid, "photos", photoId));
}

//メンバー追加
export function addUserAttendance(event) {
  const user = auth.currentUser;
  updateDoc(doc(db, "events", event.id), {
    attendees: arrayUnion({
      id: user.uid,
      displayName: user.displayName,
      photoURL: user.photoURL || null,
      occupation: user.occupation || "",
    }),
    attendeeIds: arrayUnion(user.uid),
  });
}

//メンバーキャンセル
export async function cancelUserAttendance(event) {
  const user = auth.currentUser;
  try {
    const eventDoc = await getDoc(doc(db, "events", event.id));
    return updateDoc(doc(db, "events", event.id), {
      attendees: eventDoc
        .data()
        .attendees.filter((attendee) => attendee.id !== user.uid),
      attendeeIds: arrayRemove(user.uid),
    });
  } catch (error) {
    throw error;
  }
}

//イベントタブで使用（今は使わない）
export function getUserEventsQuery(activeTab, userUid) {
  let eventsRef = collection(db, "events");
  // const today = new Date();
  switch (activeTab) {
    case 1: // past events
      return query(
        eventsRef,
        where("attendeeIds", "array-contains", userUid),
        // where("date", "<=", today),
        orderBy("date", "desc")
      );
    case 2: // hosted
      return query(eventsRef, where("hostUid", "==", userUid), orderBy("date"));
    default:
      return query(
        eventsRef,
        where("attendeeIds", "array-contains", userUid),
        // where("date", ">=", today),
        orderBy("date")
      );
  }
}

//フォローボタンを押したときのアクション
export async function followUser(profile) {
  const user = auth.currentUser;
  // const batch = writeBatch(db);
  //バッチ処理(一度に多くのユーザーのフォローアクションに対応)
  try {
    setDoc(doc(db, "following", user.uid, "userFollowing", profile.id), {
      displayName: profile.displayName,
      photoURL: profile.photoURL || "/assets/user.png",
      uid: profile.id,
    });
    //firestoreのアクション
    setDoc(doc(db, "following", profile.id, "userFollowers", user.uid), {
      displayName: user.displayName,
      photoURL: user.photoURL || "/assets/user.png",
      uid: user.id,
    });

    updateDoc(doc(db, "users", user.uid), {
      followingCount: increment(1),
    });
    updateDoc(doc(db, "users", profile.id), {
      followerCount: increment(1),
    });
    // return await batch.commit();
  } catch (e) {
    throw e;
  }
}

//アンフォローボタンを押したときのアクション
export async function unFollowUser(profile) {
  const user = auth.currentUser;
  const batch = writeBatch(db);
  try {
    batch.delete(doc(db, "following", user.uid, "userFollowing", profile.id));
    batch.update(doc(db, "users", user.uid), {
      followingCount: increment(-1),
    });
    return await batch.commit();
  } catch (e) {
    throw e;
  }
}

//フォロワーを獲得するアクション
export function getFollowersCollection(profileId) {
  return collection(db, "following", profileId, "userFollowers");
}

//フォローした人を獲得するアクション
export function getFollowingCollection(profileId) {
  return collection(db, "following", profileId, "userFollowing");
}

//フォローしているIDをゲット
export function getFollowingDoc(profileId) {
  const userUid = auth.currentUser.uid;
  return getDoc(doc(db, "following", userUid, "userFollowing", profileId));
}

//お気に入り企業追加
export function addUserFavoriteCompany(event) {
  const user = auth.currentUser;
  updateDoc(doc(db, "events", event.id), {
    favoriteUserId: arrayUnion(user.uid),
  });
  return updateDoc(doc(db, "users", user.uid), {
    favoriteCompanyId: arrayUnion(event.id),
  });
}
