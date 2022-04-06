import React from "react";
import ModalWrapper from "../../app/common/modals/ModalWrapper";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import {
  Button,
} from "semantic-ui-react";
import { useDispatch } from "react-redux";
import { closeModal } from "../../app/common/modals/modalReducer";
import { Link, useHistory } from "react-router-dom";
import MySelectInput from "../../app/common/form/MySelectInput";
import { userTypeOptions } from "../../app/api/userTypeOptions";
import { toast } from "react-toastify";
import { UserType } from "../../app/firestore/firestoreService";

export default function UserTypePage() {
  const dispatch = useDispatch();
  const history = useHistory();
  return (
    <>
      <ModalWrapper size='mini' header='ユーザーのタイプを選択してください'>
        <Formik
          initialValues={{
            userType: "",
          }}
          validationSchema={Yup.object({
            userType: Yup.string().required(),
          })}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              await UserType(values); //firestoreに追加
              setSubmitting(false);
              dispatch(closeModal());
              history.push("/events");
            } catch (error) {
              toast.error(error.message);
              setSubmitting(false);
            }
          }}
        >
          {({ isSubmitting, isValid, dirty }) => (
            <Form className='ui form'>
              <MySelectInput
                name='userType'
                placeholder='ユーザーのタイプ'
                options={userTypeOptions}
              />

              <Button
                loading={isSubmitting}
                disabled={!isValid || !dirty || isSubmitting}
                type='submit'
                fluid
                size='large'
                color='teal'
                content='Register'
              />
              <Button
                fluid
                size='large'
                content='return'
                style={{ marginTop: 10 }}
                as={Link}
                to={"/events"}
              />
            </Form>
          )}
        </Formik>
      </ModalWrapper>
    </>
  );
}
