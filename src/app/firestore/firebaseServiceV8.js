// import firebase from "../config/firebase";
// import { setUserProfileData } from "./firestoreService";
// import { toast } from "react-toastify";

// //firebaseオブジェクト配列
// export function firebaseObjectToArray(snapshot) {
//   return Object.entries(snapshot).map(
//     (e) => Object.assign({}, e[1], { id: e[0] })
//     //第一引数に無名オブジェクトを指定することで、コピーした内容の新規オブジェクトを作成できる。
//     //第二引数にe[1]を指定,第三引数id: e[0]を指定することで、一つのオブジェクトにまとめることができる(id= e[0])
//   );
// }

// //signIn
// export function signInWithEmail(creds) {
//   return firebase
//     .auth()
//     .signInWithEmailAndPassword(creds.email, creds.password);
// }

// //signOut
// export function signOutFirebase() {
//   return firebase.auth().signOut();
// }

// //register
// export async function registerInFirebase(creds) {
//   try {
//     const result = await firebase
//       .auth()
//       .createUserWithEmailAndPassword(creds.email, creds.password);
//     await result.user.updateProfile({
//       displayName: creds.displayName,
//     });
//     return await setUserProfileData(result.user);
//   } catch (error) {
//     throw error;
//   }
// }

// //SNSログイン
// export async function socialLogin(selectedProvider) {
//   let provider;
//   if (selectedProvider === "facebook") {
//     provider = new firebase.auth.FacebookAuthProvider();
//   }
//   if (selectedProvider === "google") {
//     provider = new firebase.auth.GoogleAuthProvider();
//   }
//   try {
//     const result = await firebase.auth().signInWithPopup(provider);
//     console.log(result);
//     if (result.additionalUserInfo.isNewUser) {
//       await setUserProfileData(result.user);
//     }
//   } catch (error) {
//     toast.error(error.message);
//   }
// }

// //パスワード更新
// export function updateUserPassword(creds) {
//   const user = firebase.auth().currentUser;
//   return user.updatePassword(creds.newPassword1);
// }

// //storageへアップロード(ユーザー)
// export function uploadToFirebaseStorage(file, filename) {
//   const user = firebase.auth().currentUser;
//   const storageRef = firebase.storage().ref();
//   return storageRef.child(`${user.uid}/user_images/${filename}`).put(file);
// }

// //storageへアップロード(イベント)
// export function uploadToFirebaseStorageOfCompany(file, filename) {
//   const user = firebase.auth().currentUser;
//   const storageRef = firebase.storage().ref();
//   return storageRef.child(`${user.uid}/company_images/${filename}`).put(file);
// }

// //storage削除
// export function deleteFromFirebaseStorage(filename) {
//   //写真のidじゃなく名前を取得し削除する
//   const userUid = firebase.auth().currentUser.uid;
//   const storageRef = firebase.storage().ref();
//   const photoRef = storageRef.child(`${userUid}/user_images/${filename}`);
//   return photoRef.delete();
// }

// //チャット機能をDBに保存
// export function addEventChatComment(eventId, values) {
//   const user = firebase.auth().currentUser;
//   const newComment = {
//     displayName: user.displayName,
//     photoURL: user.photoURL,
//     uid: user.uid,
//     text: values.comment,
//     date: Date.now(),
//     parentId: values.parentId,
//   };
//   return firebase.database().ref(`chat/${eventId}`).push(newComment);
// }

// //DBからチャット内容を出力
// export function getEventChatRef(eventId) {
//   return firebase.database().ref(`chat/${eventId}`).orderByKey();
// }

// //フィードを出力
// export function getUserFeedRef() {
//   const user = firebase.auth().currentUser;
//   return firebase.database().ref(`posts/${user.uid}`).orderByKey().limitToLast(3);
// }