// import firebase from "../config/firebase";

// const db = firebase.firestore();

// //firestoreから取得するデータ型を決める
// export function dataFromSnapshot(snapshot) {
//   if (!snapshot.exists) return undefined;
//   const data = snapshot.data();

//   //日付(timestampをJSに変換)
//   for (const prop in data) {
//     if (data.hasOwnProperty(prop)) {
//       if (data[prop] instanceof firebase.firestore.Timestamp) {
//         data[prop] = data[prop].toDate();
//       }
//     }
//   }

//   return {
//     ...data,
//     id: snapshot.id,
//   };
// }

// //eventsコレクションへDB接続
// export function fetchEventsFromFirestore(
//   filter,
//   startDate,
//   limit,
//   lastDocSnapshot = null
// ) {
//   const user = firebase.auth().currentUser;
//   let eventsRef = db
//     .collection("events")
//     .orderBy("date")
//     .orderBy("createdAt", "desc")
//     .startAfter(lastDocSnapshot)
//     .limit(limit);
//   switch (filter) {
//     case "engineer":
//       return eventsRef
//         .where("career", "array-contains", "エンジニア")
//         .where("date", "<=", startDate);
//     // .where("createdAt", "<=", predicate.get("startDate"));
//     case "designer":
//       return eventsRef
//         .where("career", "array-contains", "デザイナー")
//         .where("date", "<=", startDate);
//     // .where("createdAt", "<=", predicate.get("startDate"));
//     case "isHosting":
//       return eventsRef
//         .where("hostUid", "==", user.uid)
//         .where("date", "<=", startDate);
//     // .where("createdAt", "<=", predicate.get("startDate"));
//     // .where("date", ">=", predicate.get("startDate"));

//     // case "isGoing":
//     //   return eventsRef
//     //   .where('attendeeIds','array-contains',user.uid)
//     default:
//       // return eventsRef;
//       // return eventsRef.where(
//       //   ("createdAt", "desc"),
//       //   "=>",
//       //   predicate.get("startDate")
//       // );
//       return eventsRef.where("date", "<=", startDate);
//   }
// }

// //eventsコレクションへDB接続(idバージョン)
// export function listenToEventFromFirestore(eventId) {
//   return db.collection("events").doc(eventId);
// }

// //firestore作成関数(eventsコレクションに参加者を追加する)
// export function addEventToFirestore(event) {
//   const user = firebase.auth().currentUser;
//   return db.collection("events").add({
//     ...event,
//     hostUid: user.uid,
//     hostedBy: user.displayName,
//     hostPhotoURL: user.photoURL || null,
//     attendees: firebase.firestore.FieldValue.arrayUnion({
//       id: user.uid,
//       displayName: user.displayName,
//       photoURL: user.photoURL || null,
//     }),
//     attendeeIds: firebase.firestore.FieldValue.arrayUnion(user.uid),
//     // career: firebase.firestore.FieldValue.arrayUnion(),
//     createdAt: firebase.firestore.FieldValue.serverTimestamp(),
//   });
// }

// //firestore更新関数
// export function updateEventInFirestore(event) {
//   return db.collection("events").doc(event.id).update(event);
// }

// //firestore削除関数
// export function deleteEventInFirestore(eventId) {
//   return db.collection("events").doc(eventId).delete();
// }

// //イベントのキャンセル
// export function cancelEventToggle(event) {
//   return db.collection("events").doc(event.id).update({
//     isCancelled: !event.isCancelled,
//   });
// }

// //新規登録時のユーザー設定
// export function setUserProfileData(user) {
//   return db
//     .collection("users")
//     .doc(user.uid)
//     .set({
//       displayName: user.displayName,
//       email: user.email,
//       photoURL: user.photoURL || null,
//       createdAt: firebase.firestore.FieldValue.serverTimestamp(),
//     });
// }

// //ユーザープロフィール
// export function getUserProfile(userId) {
//   return db.collection("users").doc(userId);
// }

// //プロフィール更新(displayNameで判別)
// export async function updateUserProfile(profile) {
//   const user = firebase.auth().currentUser;
//   try {
//     if (user.displayName !== profile.displayName) {
//       await user.updateProfile({
//         displayName: profile.displayName,
//       });
//     }
//     return await db.collection("users").doc(user.uid).update(profile);
//   } catch (error) {
//     throw error;
//   }
// }

// //firestore usersコレクションに画像を保存
// export async function updateUserProfilePhoto(downloadURL, filename) {
//   const user = firebase.auth().currentUser;
//   const userDocRef = db.collection("users").doc(user.uid);
//   try {
//     const userDoc = await userDocRef.get();
//     if (!userDoc.data().photoURL) {
//       await db.collection("users").doc(user.uid).update({
//         photoURL: downloadURL,
//       });
//       await user.updateProfile({
//         photoURL: downloadURL,
//       });
//     }
//     return await db.collection("users").doc(user.uid).collection("photos").add({
//       name: filename,
//       url: downloadURL,
//     });
//   } catch (error) {
//     throw error;
//   }
// }

// // firestore eventsコレクションに画像を保存
// export async function updateEventProfilePhoto(downloadURL,eventId) {
//   // const user = firebase.auth().currentUser;
//   const eventDocRef = db.collection("events").doc(eventId);
//   try {
//     const eventDoc = await eventDocRef.get();
//     if (!eventDoc.data().companyPhotoURL) {
//       await db.collection("events").doc(eventId).update({
//         companyPhotoURL: downloadURL,
//       });
//     }
//     return await db.collection("events").doc(eventId).add({
//       companyPhotoURL: downloadURL,
//     });
//   } catch (error) {
//     throw error;
//   }
// }

// //ユーザーの写真を取得
// export function getUserPhotos(userUid) {
//   return db.collection("users").doc(userUid).collection("photos");
// }

// //会社の写真を取得
// export function getCompanyPhotos(eventId) {
//   return db.collection("events").doc(eventId);
// }



// //メイン写真の設定
// export async function setMainPhoto(photo) {
//   const user = firebase.auth().currentUser;
//   const today = new Date();
//   const eventDocQuery = db
//     .collection("events")
//     .where("attendeeIds", "array-contains", user.uid)
//     .where("date", "<=", today);
//   const userFollowingRef = db
//     .collection("following")
//     .doc(user.uid)
//     .collection("userFollowing");

//   const batch = db.batch();

//   //写真の更新
//   batch.update(db.collection("users").doc(user.uid), {
//     photoURL: photo.url,
//   });
//   try {
//     const eventsQuerySnap = await eventDocQuery.get();
//     for (let i = 0; i < eventsQuerySnap.docs.length; i++) {
//       let eventDoc = eventsQuerySnap.docs[i];
//       //ホストユーザーの写真更新
//       if (eventDoc.data().hostUid === user.uid) {
//         batch.update(eventsQuerySnap.docs[i].ref, {
//           hostPhotoURL: photo.url,
//         });
//       }
//       //attendees(メンバー)の写真更新
//       batch.update(eventsQuerySnap.docs[i].ref, {
//         attendees: eventDoc.data().attendees.filter((attendee) => {
//           if (attendee.id === user.uid) {
//             attendee.photoURL = photo.url;
//           }
//           return attendee;
//         }),
//       });
//     }
//     //フォローユーザーの写真更新
//     const userFollowingSnap = await userFollowingRef.get();
//     userFollowingSnap.docs.forEach((docRef) => {
//       let followingDocRef = db
//         .collection("following")
//         .doc(docRef.id)
//         .collection("userFollowers")
//         .doc(user.uid);
//       batch.update(followingDocRef, {
//         photoURL: photo.url,
//       });
//     });
//     await batch.commit(); //バッチ処理

//     return await user.updateProfile({
//       photoURL: photo.url,
//     });
//   } catch (error) {
//     throw error;
//   }
// }

// //firestore users,photoから画像を削除
// export function deletePhotoFromCollection(photoId) {
//   const userUid = firebase.auth().currentUser.uid;
//   return db
//     .collection("users")
//     .doc(userUid)
//     .collection("photos")
//     .doc(photoId)
//     .delete();
// }

// //参加者追加（会社のメンバー追加）
// export function addUserAttendance(event) {
//   const user = firebase.auth().currentUser;
//   return db
//     .collection("events")
//     .doc(event.id)
//     .update({
//       attendees: firebase.firestore.FieldValue.arrayUnion({
//         id: user.uid,
//         displayName: user.displayName,
//         photoURL: user.photoURL || null,
//       }),
//       attendeeIds: firebase.firestore.FieldValue.arrayUnion(user.uid),
//     });
// }

// //参加者キャンセル（会社のメンバー削除）
// export async function cancelUserAttendance(event) {
//   const user = firebase.auth().currentUser;
//   try {
//     //参加中のメンバーを取得
//     const eventDoc = await db.collection("events").doc(event.id).get();
//     return db
//       .collection("events")
//       .doc(event.id)
//       .update({
//         attendeeIds: firebase.firestore.FieldValue.arrayRemove(user.uid),
//         attendees: eventDoc
//           .data()
//           .attendees.filter((attendee) => attendee.id !== user.uid),
//       });
//   } catch (error) {
//     throw error;
//   }
// }

// //おそらく使わない
// export function getUserEventsQuery(activeTab, userUid) {
//   let eventsRef = db.collection("events");
//   switch (activeTab) {
//     case 1: //past events
//       return eventsRef
//         .where("attendeeIds", "array-contains", userUid)
//         .orderBy("date", "desc");
//     case 2: //hosting
//       return eventsRef.where("hostUid", "==", userUid).orderBy("date");
//     default:
//       return eventsRef
//         .where("attendeeIds", "array-contains", userUid)
//         .orderBy("date");
//   }
// }

// //フォローボタンを押したときのアクション
// export async function followUser(profile) {
//   const user = firebase.auth().currentUser;
//   const batch = db.batch(); //バッチ処理(一度に多くのユーザーのフォローアクションに対応)
//   try {
//     batch.set(
//       db
//         .collection("following")
//         .doc(user.uid)
//         .collection("userFollowing")
//         .doc(profile.id),
//       {
//         displayName: profile.displayName,
//         photoURL: profile.photoURL,
//         uid: profile.id,
//       }
//     );
//     batch.update(db.collection("users").doc(user.uid), {
//       followingCount: firebase.firestore.FieldValue.increment(1),
//     });
//     return await batch.commit();
//   } catch (error) {
//     throw error;
//   }
// }

// //アンフォローボタンを押したときのアクション
// export async function unFollowUser(profile) {
//   const batch = db.batch();
//   const user = firebase.auth().currentUser;
//   try {
//     batch.delete(
//       db
//         .collection("following")
//         .doc(user.uid)
//         .collection("userFollowing")
//         .doc(profile.id)
//     );

//     batch.update(db.collection("users").doc(user.uid), {
//       followingCount: firebase.firestore.FieldValue.increment(-1),
//     });

//     return await batch.commit();
//   } catch (error) {
//     throw error;
//   }
// }

// //フォロワーを獲得するアクション
// export function getFollowersCollection(profileId) {
//   return db.collection("following").doc(profileId).collection("userFollowers");
// }
// //フォローした人を獲得するアクション
// export function getFollowingCollection(profileId) {
//   return db.collection("following").doc(profileId).collection("userFollowing");
// }

// //フォローしているIDをゲット
// export function getFollowingDoc(profileId) {
//   const userUid = firebase.auth().currentUser.uid;
//   return db
//     .collection("following")
//     .doc(userUid)
//     .collection("userFollowing")
//     .doc(profileId)
//     .get();
// }
