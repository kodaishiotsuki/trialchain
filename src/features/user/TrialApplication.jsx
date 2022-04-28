import { getAuth } from "firebase/auth";
import {
  collection,
  doc,
  getDocs,
  getFirestore,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, Redirect, useHistory } from "react-router-dom";
import { Button, Form, Header, Segment } from "semantic-ui-react";
import ModalWrapper from "../../app/common/modals/ModalWrapper";
import { app } from "../../app/config/firebase";

export default function TrialApplication() {
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const { error } = useSelector((state) => state.async);
  const [companies, setCompanies] = useState([]);
  //firebase
  const db = getFirestore(app);
  const auth = getAuth(app);
  //ログインユーザー
  const user = auth.currentUser;

  //お気に入り企業リストを取得
  useEffect(() => {
    try {
      const q = query(
        collection(db, "events"),
        where("favoriteUserId", "array-contains", user.uid)
      );
      getDocs(q).then((querySnapshot) => {
        setCompanies(
          querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
        //コンソールで表示
        console.log(
          querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
      });
    } catch (error) {
      console.log(error.message);
    }
  }, [db, user.uid]);

  //エラーが発生した場合はリダイレクト
  if (error) return <Redirect to='/error' />;

  // const company = companies.map((company) => console.log(company));

  const handleSubmit = async (event) => {
    setLoading(true);
    event.preventDefault();
    const { firstTrialCompany, secondTrialCompany, thirdTrialCompany } =
      event.target.id;

    await updateDoc(doc(db, "users", user?.uid), {
      firstTrialCompany: [...companies.firstTrialCompany],
      secondTrialCompany: [...companies.secondTrialCompany],
      thirdTrialCompany: [...companies.thirdTrialCompany],
    });
    setLoading(false);
    return history.push("/events");
  };

  return (
    <>
      <ModalWrapper>
        <Segment
          textAlign='center'
          style={{ border: "none", width: 730, marginBottom: 20 }}
          attached='top'
          secondary
          inverted
          color='teal'
        >
          <h2>トライアル申請</h2>
        </Segment>
        <Form
          className='ui form'
          // onSubmit={handleSubmit}
          style={{ width: 730 }}
        >
          <Header content='第一希望の企業を選択していください' />
          <Form.Field
            control='select'
            name='firstTrialCompany'
            placeholder='第一希望の企業を選択していください'
          >
            {companies.map((data, index) => (
              <option
                value={data}
                id={index}
              >{`${data.title} トライアル期間${data.trialMonth}ヶ月`}</option>
            ))}
          </Form.Field>
          <Header content='第二希望の企業を選択していください' />
          <Form.Field
            control='select'
            name='secondTrialCompany'
            placeholder='第二希望の企業を選択していください'
          >
            {companies.map((data, index) => (
              <option
                value={data}
                id={index}
              >{`${data.title} トライアル期間${data.trialMonth}ヶ月`}</option>
            ))}
          </Form.Field>
          <Header content='第三希望の企業を選択していください' />
          <Form.Field
            control='select'
            name='thirdTrialCompany'
            placeholder='第三希望の企業を選択していください'
          >
            {companies.map((data, index) => (
              <option
                value={data}
                id={index}
              >{`${data.title} トライアル期間${data.trialMonth}ヶ月`}</option>
            ))}
          </Form.Field>
          <Button
            floated='right'
            type='submit'
            size='large'
            color='teal'
            content='Submit'
            style={{ marginBottom: 10 }}
            loading={loading}
          />
          <Button
            floated='right'
            size='large'
            content='Return'
            style={{ marginBottom: 10 }}
            as={Link}
            to={`/trial`}
          />
        </Form>
      </ModalWrapper>
    </>
  );
}
