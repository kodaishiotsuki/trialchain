/* global google */
import React, { useState } from "react";
import { Button, Confirm, Header, Segment } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { clearSelectedEvents, listenToSelectedEvents } from "../eventActions";

import { Formik, Form } from "formik";
import * as Yup from "yup";
import MyTextInput from "../../../app/common/form/MyTextInput";
import MyTextArea from "../../../app/common/form/MyTextArea";
import MySelectInput from "../../../app/common/form/MySelectInput";
import { categoryData } from "../../../app/api/categoryOptions";
import { trialMonth } from "../../../app/api/trialMonth";
import MyDateInput from "../../../app/common/form/MyDateInput";
import MyPlaceInput from "../../../app/common/form/MyPlaceInput";
import {
  addEventToFirestore,
  cancelEventToggle,
  listenToEventFromFirestore,
  updateEventInFirestore,
} from "../../../app/firestore/firestoreService";
import useFirestoreDoc from "../../../app/hooks/useFirestoreDoc";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { Redirect } from "react-router-dom";
import { toast } from "react-toastify";
import { careerData } from "../../../app/api/careerOptions";
import { useEffect } from "react";

// import firebase from "../../../app/config/firebase";
// import MyFileInput from "../../../app/common/form/MyFileInput";

export default function EventForm({ match, history, location }) {
  const dispatch = useDispatch();

  const [loadingCancel, setLoadingCancel] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const { selectedEvent } = useSelector((state) => state.event);
  const { loading, error } = useSelector((state) => state.async);

  //新規会社登録画面をクリア
  useEffect(() => {
    //EventFormコンポーネント,props,location,pathname
    if (location.pathname !== "/createEvent") return;
    dispatch(clearSelectedEvents()); //dispatchでeventAction呼び出し
  }, [dispatch, location.pathname]);

  //inputフォーム
  const initialValues = selectedEvent ?? {
    title: "",
    career: [],
    category: "",
    trialMonth: "",
    description: "",
    pitchId: "",
    city: {
      address: "",
      latLng: null,
    },
    venue: {
      address: "",
      latLng: null,
    },
    date: "",
    favoriteUserId: [],
  };

  //入力画面バリデーション
  const validationSchema = Yup.object({
    title: Yup.string().required("企業名を入力してください"),
    // career: Yup.string().required("求めている人材を選択してください"),
    category: Yup.string().required("写真のタイプを選んでください"),
    description: Yup.string().required("企業の詳細を入力してください"),
    // city: Yup.object().shape({
    //   address: Yup.string().required("都道府県を入力してください"),
    // }),
    venue: Yup.object().shape({
      address: Yup.string().required("住所または企業名を入力してください"),
    }),
    date: Yup.string().required("創業年月日を選択してください"),
  });

  //キャンセルボタンクリック時のアクション
  async function handleCancelToggle(event) {
    setConfirmOpen(false);
    setLoadingCancel(true);
    try {
      await cancelEventToggle(event);
      setLoadingCancel(false);
    } catch (error) {
      setLoadingCancel(true);
      toast.error(error.message);
    }
  }

  //eventsコレクションのidに紐付ける(データの受け取り)
  useFirestoreDoc({
    shouldExecute:
      match.params.id !== selectedEvent?.id && //store内で選択したイベントと異なる時
      location.pathname !== "/createEvent", //パス名が異なる時
    query: () => listenToEventFromFirestore(match.params.id),
    data: (event) => dispatch(listenToSelectedEvents(event)),
    deps: [match.params.id, dispatch],
  });
  //loading表示
  if (loading) return <LoadingComponent content='Loading event...' />;

  //エラーが発生した場合はリダイレクト
  if (error) return <Redirect to='/error' />;

  return (
    <Segment clearing>
      {/* 入力はFORMIK使用 */}
      <Formik
        enableReinitialize
        validationSchema={validationSchema}
        initialValues={initialValues}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            //イベント更新 or 新規イベント
            selectedEvent
              ? await updateEventInFirestore(values)
              : await addEventToFirestore(values);
            history.push("/events"); //入力送信後にeventページへ遷移
          } catch (error) {
            toast.error(error.message);
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting, dirty, isValid, values }) => (
          <Form className='ui form'>
            <Header
              sub
              color='teal'
              content='企業の情報を入力してください'
              size='huge'
            />
            <MyTextInput name='title' placeholder='企業名' />
            <MySelectInput
              name='category'
              placeholder='写真のタイプを選択してください'
              options={categoryData}
            />
            <MySelectInput
              name='trialMonth'
              placeholder='トライアル雇用期間を選択してください'
              options={trialMonth}
            />
            <MyTextInput
              name='pitchId'
              placeholder='YouTubeのIDを入力してください'
            />
            <MySelectInput
              name='career[0]'
              placeholder='求めている人材を選択してください'
              options={careerData}
            />
            <MySelectInput
              name='career[1]'
              placeholder='求めている人材を選択してください'
              options={careerData}
            />
            <MySelectInput
              name='career[2]'
              placeholder='求めている人材を選択してください'
              options={careerData}
            />
            <MyTextArea
              name='description'
              placeholder='企業の詳細を記入してください'
              rows={5}
            />

            <Header
              sub
              color='teal'
              content='企業の住所を入力してください'
              size='huge'
            />
            {/* <MyPlaceInput name='city' placeholder='都道府県' /> */}
            <MyPlaceInput
              name='venue'
              // disabled={!values.city.latLng}
              placeholder='住所または企業名'
              options={{
                location: new google.maps.LatLng(values.city.latLng),
                radius: 1000, //半径1000km以内
                types: ["establishment"],
              }}
            />
            <Header
              sub
              color='teal'
              content='創業年月日を入力してください'
              size='huge'
            />
            <MyDateInput
              name='date'
              placeholder='Date of founded'
              dateFormat='yyyy/MM/dd'
              autoComplete='off'
            />

            {selectedEvent && (
              <Button
                loading={loadingCancel}
                type='button'
                floated='left'
                color={selectedEvent.isCancelled ? "green" : "red"}
                content={
                  selectedEvent.isCancelled ? "Reactive Event" : "Cancel Event"
                }
                onClick={() => setConfirmOpen(true)}
              />
            )}

            <Button
              loading={isSubmitting}
              disabled={!isValid || !dirty || isSubmitting}
              type='submit'
              floated='right'
              positive
              content='Submit'
            />
            <Button
              disabled={isSubmitting}
              as={Link}
              to='/events'
              type='submit'
              floated='right'
              content='Cancel'
            />
          </Form>
        )}
      </Formik>
      <Confirm
        content={
          selectedEvent?.isCancelled
            ? "This will reactive the event - are you sure?"
            : "This will cancel the event - are you sure?"
        }
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={() => handleCancelToggle(selectedEvent)}
      />
    </Segment>
  );
}
