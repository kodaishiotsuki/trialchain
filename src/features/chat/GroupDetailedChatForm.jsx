import React from "react";
import { Formik, Form, Field } from "formik";
import { toast } from "react-toastify";
import { Loader } from "semantic-ui-react";
import * as Yup from "yup";
import { addGroupChatComment } from "../../app/firestore/firebaseService";

export default function GroupDetailedChatForm({
  groupId,
  parentId,
  closeForm,
}) {
  return (
    <Formik
      initialValues={{ comment: "" }}
      validationSchema={Yup.object({
        comment: Yup.string().required(),
      })}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        try {
          await addGroupChatComment(groupId, { ...values, parentId });
          resetForm();
        } catch (error) {
          toast.error(error.message);
        } finally {
          setSubmitting(false);
          closeForm({ open: false, commentId: null });
        }
      }}
    >
      {({ isSubmitting, handleSubmit, isValid }) => (
        <Form className='ui form'>
          <Field name='comment'>
            {({ field }) => (
              <div style={{ position: "relative" }}>
                <Loader active={isSubmitting} />
                <textarea
                  rows='3'
                  {...field}
                  placeholder='送信はEnterキー,改行はShift + Enterキー'
                  onKeyPress={(e) => {
                    if (e.key === "Enter" && e.shiftKey) {
                      return;
                    }
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      isValid && handleSubmit();
                    }
                  }}
                ></textarea>
              </div>
            )}
          </Field>
        </Form>
      )}
    </Formik>
  );
}
