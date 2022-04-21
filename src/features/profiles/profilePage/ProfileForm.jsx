import React from "react";
import { Formik, Form } from "formik";
import MyTextInput from "../../../app/common/form/MyTextInput";
import { Button, Header } from "semantic-ui-react";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { updateUserProfile } from "../../../app/firestore/firestoreService";
import MySelectInput from "../../../app/common/form/MySelectInput";
import {careerData} from "../../../app/api/careerOptions";

export default function ProfileForm({ profile }) {
  return (
    <Formik
      initialValues={{
        displayName: profile.displayName,
        occupation: profile.occupation || "",
        description: profile.description || "",
        twitterURL: profile.twitterURL || "",
        facebookURL: profile.facebookURL || "",
        gitHubURL: profile.gitHubURL || "",
        noteURL: profile.noteURL || "",
        mission: profile.mission || "",
        vision: profile.vision || "",
        value: profile.value || "",
      }}
      validationSchema={Yup.object({
        displayName: Yup.string().required(),
      })}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          await updateUserProfile(values);
        } catch (error) {
          toast.error(error.message);
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ isSubmitting, isValid, dirty }) => (
        <Form className='ui form'>
          <Header
            sub
            color='teal'
            content='名前を入力してください'
            size='huge'
          />
          <MyTextInput name='displayName' placeholder='ニックネーム' />
          <Header
            sub
            color='teal'
            content='現在の職種を選択してください'
            size='huge'
          />
          <MySelectInput
            name='occupation'
            placeholder='現在の職種を選択してください'
            options={careerData}
          />
          <Header
            sub
            color='teal'
            content='自身のミッション / ビジョン / バリューを入力してください'
            size='huge'
          />
          <MyTextInput name='mission' placeholder='ミッション' />
          <MyTextInput name='vision' placeholder='ビジョン' />
          <MyTextInput name='value' placeholder='バリュー' />
          {/* <MyTextArea name='description' placeholder='Description' /> */}
          <Header
            sub
            color='teal'
            content='各SNSのURLを入力してください'
            size='huge'
          />
          <MyTextInput name='twitterURL' placeholder='twitterURL' />
          <MyTextInput name='facebookURL' placeholder='facebookURL' />
          <MyTextInput name='gitHubURL' placeholder='gitHubURL' />
          <MyTextInput name='noteURL' placeholder='noteURL' />
          <Button
            loading={isSubmitting}
            disabled={isSubmitting || !isValid || !dirty}
            floated='right'
            type='submit'
            size='large'
            positive
            content='Update profile'
          />
        </Form>
        // <Form className='ui form'>
        //   <MyTextInput name='displayName' placeholder='Display Name' />
        //   <MySelectInput
        //     name='occupation'
        //     placeholder='現在の職種を選択してください'
        //     options={careerData}
        //   />
        //   <MyTextArea name='description' placeholder='Description' />
        //   <MyTextInput name='meetyURL' placeholder='MeetyURL' />
        //   <Header content='各SNSのURLを入力してください' />
        //   <MyTextInput name='twitterURL' placeholder='twitterURL' />
        //   <MyTextInput name='facebookURL' placeholder='facebookURL' />
        //   <MyTextInput name='gitHubURL' placeholder='gitHubURL' />
        //   <MyTextInput name='noteURL' placeholder='noteURL' />
        //   <Button
        //     loading={isSubmitting}
        //     disabled={isSubmitting || !isValid || !dirty}
        //     floated='right'
        //     type='submit'
        //     size='large'
        //     positive
        //     content='Update profile'
        //   />
        // </Form>
      )}
    </Formik>
  );
}
