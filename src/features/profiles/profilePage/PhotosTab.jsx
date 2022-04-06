import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Button, Grid, Header, Tab, Card, Image } from "semantic-ui-react";
import PhotoUploadWidget from "../../../app/common/photos/PhotoUploadWidget";
import {
  deletePhotoFromCollection,
  getUserPhotos,
  setMainPhoto,
} from "../../../app/firestore/firestoreService";
import useFirestoreCollection from "../../../app/hooks/useFirestoreCollection";
import { listenToUserPhotos } from "../profileActions";
import { toast } from "react-toastify";
import { deleteFromFirebaseStorage } from "../../../app/firestore/firebaseService";

export default function PhotosTab({ profile, isCurrentUser }) {
  const dispatch = useDispatch();
  const [editMode, setEditMode] = useState(false);
  const { loading } = useSelector((state) => state.async); //rootReducer
  const { photos } = useSelector((state) => state.profile); //rootReducer
  const [updating, setUpdating] = useState({ isUpdating: false, target: null });
  const [deleting, setDeleting] = useState({ isDeleting: false, target: null });

  //firestore DBを使うために必要
  useFirestoreCollection({
    query: () => getUserPhotos(profile.id), //firestoreのService
    data: (photos) => dispatch(listenToUserPhotos(photos)), //Redux action
    deps: [profile.id, dispatch], //依存関係
  });

  //プロフ写真の更新
  async function handleSetMainPhoto(photo, target) {
    setUpdating({ isUpdating: true, target });
    try {
      await setMainPhoto(photo); //←firestoreService.js
    } catch (error) {
      toast.error(error.message); //アラート機能
    } finally {
      setUpdating({ isUpdating: false, target: null });
    }
  }

  //プロフ写真の削除
  async function handleDeletePhoto(photo, target) {
    setDeleting({ isDeleting: true, target });
    try {
      await deleteFromFirebaseStorage(photo.name); //firebaseService.js storageのファイル名を検出
      await deletePhotoFromCollection(photo.id); //firestoreService.js firestoreのphotoIdを検出
    } catch (error) {
      toast.error(error.message);
    } finally {
      setDeleting({ isDeleting: false, target: null });
    }
  }

  return (
    <Tab.Pane loading={loading}>
      <Grid>
        <Grid.Column width={16}>
          <Header floated='left' icon='user' content={`Photos`} />

          {isCurrentUser && (
            <Button
              onClick={() => setEditMode(!editMode)}
              floated='right'
              basic
              content={editMode ? "Cancel" : "Add Photo"}
            />
          )}
        </Grid.Column>
        <Grid.Column width={16}>
          {editMode ? (
            <PhotoUploadWidget setEditMode={setEditMode} />
          ) : (
            <Card.Group itemsPerRow={5}>
              {photos.map((photo) => (
                <Card key={photo.id}>
                  <Image src={photo.url} />
                  {isCurrentUser && (
                    <Button.Group>
                      <Button
                        name={photo.id}
                        loading={
                          updating.isUpdating && updating.target === photo.id
                        }
                        onClick={(e) =>
                          handleSetMainPhoto(photo, e.target.name)
                        }
                        disabled={photo.url === profile.photoURL}
                        basic
                        color='green'
                        content='Main'
                      />
                      <Button
                        name={photo.id}
                        onClick={(e) => handleDeletePhoto(photo, e.target.name)}
                        loading={
                          deleting.isDeleting && deleting.target === photo.id
                        }
                        disabled={photo.url === profile.photoURL}
                        basic
                        color='red'
                        icon='trash'
                      />
                    </Button.Group>
                  )}
                </Card>
              ))}
            </Card.Group>
          )}
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  );
}
