import { doc, getFirestore, updateDoc } from 'firebase/firestore';
import React, { useState } from 'react'
import { Button, Form, Header } from 'semantic-ui-react';
import { app } from '../../../app/config/firebase';

export default function BasicInformationForm({ profile }) {
  const db = getFirestore(app);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    setLoading(true);
    event.preventDefault();
    const { sex,age } = event.target.elements;
    await updateDoc(doc(db, "users", profile.userUid), {
      sex: sex.value,
      age: age.value,
    });
    return setLoading(false);
  };

  return (
    <Form className='ui form' onSubmit={handleSubmit}>
      <Header color='teal' content='会員情報' size='huge' />
      <Header sub color='teal' content='性別' size='huge' />
      <Form.Field control='select' name='sex' placeholder='性別'>
        <option value='男性'>男性</option>
        <option value='女性'>女性</option>
        <option value='選択なし'>選択なし</option>
      </Form.Field>
      <Header sub color='teal' content='年齢' size='huge' />
      <Form.Field control='select' name='age' placeholder='年齢'>
        <option value='20歳'>20歳</option>
        <option value='21歳'>21歳</option>
        <option value='22歳'>22歳</option>
        <option value='23歳'>23歳</option>
        <option value='24歳'>24歳</option>
        <option value='25歳'>25歳</option>
        <option value='26歳'>26歳</option>
        <option value='27歳'>27歳</option>
        <option value='28歳'>28歳</option>
        <option value='29歳'>29歳</option>
        <option value='30歳'>30歳</option>
        <option value='31歳'>31歳</option>
        <option value='32歳'>32歳</option>
        <option value='33歳'>33歳</option>
        <option value='34歳'>34歳</option>
        <option value='35歳'>35歳</option>
        <option value='36歳'>36歳</option>
        <option value='37歳'>37歳</option>
        <option value='38歳'>38歳</option>
        <option value='39歳'>39歳</option>
        <option value='40歳'>40歳</option>
        <option value='40歳以上'>40歳以上</option>
        
      </Form.Field>

      <Button
        floated='right'
        type='submit'
        size='large'
        color='teal'
        content='Update profile'
        loading={loading}
      />
    </Form>
  );
}
