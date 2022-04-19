import React, { useState } from "react";
import { Button, Form, Header, Segment } from "semantic-ui-react";
import { useHistory } from "react-router-dom";
import ModalWrapper from "../../app/common/modals/ModalWrapper";
import {
  arrayUnion,
  deleteDoc,
  doc,
  getFirestore,
  updateDoc,
} from "firebase/firestore";
import { app } from "../../app/config/firebase";

export default function TrialForm({ trial }) {
  const db = getFirestore(app);
  const history = useHistory();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    setLoading(true);
    event.preventDefault();
    const { userJobOccupation, userJobSkill, UserJobDescription } =
      event.target.elements;
    await updateDoc(doc(db, "users", trial?.userId), {
      trialCompany: arrayUnion(trial?.title),
      trialMonth: arrayUnion(trial?.trialMonth),
      trialJobOccupation: arrayUnion(userJobOccupation.value),
      trialJobSkill: arrayUnion(userJobSkill.value),
      trialJobDescription: arrayUnion(UserJobDescription.value),
    });
    await deleteDoc(
      doc(db, "decidedCompany", trial?.hostUid, "users", trial?.userId)
    );
    await deleteDoc(
      doc(db, "decidedUser", trial?.userId, "companies", trial?.hostUid)
    );
    setLoading(false);
    return history.push("/events");
  };

  return (
    <>
      <ModalWrapper>
        <Segment
          textAlign='center'
          style={{ border: "none", margin: "auto", marginBottom: 20 }}
          attached='top'
          secondary
          inverted
          color='teal'
        >
          <h2>トライアル採用者のユーザーヒアリング</h2>
        </Segment>
        <Form className='ui form' onSubmit={handleSubmit}>
          <Header content='トライアル採用者の職種を選択してください' />
          <Form.Field
            control='select'
            name='userJobOccupation'
            placeholder='トライアル採用者の職種を選択してください'
          >
            <option value='エンジニア'>エンジニア</option>
            <option value='デザイナー'>デザイナー</option>
            <option value='セールス'>セールス</option>
            <option value='カスタマーサクセス'>カスタマーサクセス</option>
            <option value='PM・Webディレクション'>PM・Webディレクション</option>
            <option value='編集・ライティング'>編集・ライティング</option>
            <option value='マーケティング・PR'>マーケティング・PR</option>
            <option value='コンサルティング'>コンサルティング</option>
          </Form.Field>
          <Header content='トライアル採用者のスキルや役割を記載してください' />
          <Form.Field
            control='input'
            name='userJobSkill'
            placeholder='トライアル採用者のスキルや役割を記載してください'
          />
          <Header content='トライアル採用者の業務内容を記載してください' />
          <Form.Field
            control='input'
            name='UserJobDescription'
            placeholder='トライアル採用者の業務内容を記載してください'
          />
          <Button
            floated='right'
            type='submit'
            size='large'
            color='teal'
            content='Submit'
            style={{ marginBottom: 10 }}
            loading={loading}
          />
        </Form>
      </ModalWrapper>
    </>
  );
}
