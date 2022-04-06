import React, { useState } from "react";
import { useField } from "formik";
import { FormField, Label } from "semantic-ui-react";
import { uploadToFirebaseStorageOfCompany } from "../../firestore/firebaseService";
import {
  getCompanyPhotos,
  updateEventProfilePhoto,
} from "../../firestore/firestoreService";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import useFirestoreCollection from "../../hooks/useFirestoreCollection";
import { listenToCompanyPhotos } from "../../../features/profiles/profileActions";

export default function MyFileInput({ label, ...props }) {
  const dispatch = useDispatch();
  const [field, meta] = useField(props);
  const [image, setImage] = useState(null);
  const { photos } = useSelector((state) => state.profile); //rootReducer

  //firestore DBを使うために必要
  useFirestoreCollection({
    query: () => getCompanyPhotos(), //firestoreのService
    data: () => dispatch(listenToCompanyPhotos(photos)), //Redux action
    deps: [dispatch], //依存関係
  });

  //画像アップロード
  function handleUploadImage() {
    const uploadTask = uploadToFirebaseStorageOfCompany(image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
      },
      (error) => {
        toast.error(error.message);
      },
      () => {
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          updateEventProfilePhoto(downloadURL)
            .then(() => {
              setImage(true);
            })
            .catch((error) => {
              toast.error(error.message);
            });
        });
      }
    );
  }

  return (
    <>
      <FormField error={meta.touched && !!meta.error}>
        <label>{label}</label>
        <input {...field} {...props} type='file' onClick={handleUploadImage} />
        {meta.touched && meta.error ? (
          <Label basic color='red'>
            {meta.error}
          </Label>
        ) : null}
      </FormField>
    </>
  );
}
