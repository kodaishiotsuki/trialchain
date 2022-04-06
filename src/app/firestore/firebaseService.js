import { setUserProfileData } from "./firestoreService";
import { toast } from "react-toastify";
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
  updateProfile,
  FacebookAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
  updatePassword,
} from "firebase/auth";
import {
  getDatabase,
  ref as fbRef,
  push,
  query,
  orderByKey,
  limitToLast,
} from "firebase/database";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  deleteObject,
} from "firebase/storage";
import { app } from "../config/firebase";

const auth = getAuth(app);
const db = getDatabase(app);


//firebaseオブジェクト配列
export function firebaseObjectToArray(snapshot) {
  if (snapshot) {
    return Object.entries(snapshot).map((e) =>
      Object.assign({}, e[1], { id: e[0] })
    ); //第一引数に無名オブジェクトを指定することで、コピーした内容の新規オブジェクトを作成できる。
    //第二引数にe[1]を指定,第三引数id: e[0]を指定することで、一つのオブジェクトにまとめることができる(id= e[0])
  }
}

//ログイン
export function signInWithEmail(creds) {
  return signInWithEmailAndPassword(auth, creds.email, creds.password);
}

//ログアウト
export function signOutFirebase() {
  return signOut(auth);
}

//新規登録
export async function registerInFirebase(creds) {
  try {
    const result = await createUserWithEmailAndPassword(
      auth,
      creds.email,
      creds.password
    );
    await updateProfile(result.user, {
      displayName: creds.displayName,
    });
    return await setUserProfileData(result.user);
  } catch (error) {
    throw error;
  }
}

//SNSログイン
export async function socialLogin(selectedProvider) {
  let provider;
  if (selectedProvider === "facebook") {
    provider = new FacebookAuthProvider();
  }
  if (selectedProvider === "google") {
    provider = new GoogleAuthProvider();
  }
  try {
    const result = await signInWithPopup(auth, provider);
    console.log(result);
    if (result._tokenResponse.isNewUser) {
      await setUserProfileData(result.user);
    }
  } catch (error) {
    toast.error(error.message);
  }
}

//パスワード更新
export function updateUserPassword(creds) {
  const user = auth.currentUser;
  return updatePassword(user, creds.newPassword1);
}

//ユーザープロフをストレージにアップロード
export function uploadToFirebaseStorage(file, filename) {
  const user = auth.currentUser;
  const storage = getStorage(app);
  const storageRef = ref(storage, `${user.uid}/user_images/${filename}`);
  return uploadBytesResumable(storageRef, file);
}

//プロフ写真削除
export function deleteFromFirebaseStorage(filename) {
  const userUid = auth.currentUser.uid;
  const storage = getStorage(app);
  const storageRef = ref(storage, `${userUid}/user_images/${filename}`);
  return deleteObject(storageRef);
}

//チャット機能DBに保存
export function addEventChatComment(eventId, values) {
  const user = auth.currentUser;
  const newComment = {
    displayName: user.displayName,
    photoURL: user.photoURL,
    uid: user.uid,
    text: values.comment,
    date: Date.now(),
    parentId: values.parentId,
  };
  return push(fbRef(db, `chat/${eventId}`), newComment);
}

//DBからチャット内容を出力
export function getEventChatRef(eventId) {
  return query(fbRef(db, `chat/${eventId}`), orderByKey());
}

//フィードを出力
export function getUserFeedRef() {
  const user = auth.currentUser;
  if (!user) return;
  return query(fbRef(db, `posts/${user.uid}`), orderByKey(), limitToLast(5));
}
