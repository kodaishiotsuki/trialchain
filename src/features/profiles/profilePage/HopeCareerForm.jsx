import { doc, getFirestore, updateDoc } from 'firebase/firestore';
import React, { useState } from 'react'
import { Button, Form, Header } from 'semantic-ui-react';
import { app } from '../../../app/config/firebase';

export default function HopeCareerForm({ profile }) {
  const db = getFirestore(app);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    setLoading(true);
    event.preventDefault();
    const {
      hopeOccupation,
      hopeIndustry,
      hopeJoinSeason,
      numberOfJobChanges,
    } = event.target.elements;
    await updateDoc(doc(db, "users", profile.userUid), {
      hopeOccupation: hopeOccupation.value,
      hopeIndustry: hopeIndustry.value,
      hopeJoinSeason: hopeJoinSeason.value,
      numberOfJobChanges: numberOfJobChanges.value,
    });
    return setLoading(false);
  };

  return (
    <Form className='ui form' onSubmit={handleSubmit}>
      <Header
        sub
        color='teal'
        content='希望職種を選択してください'
        size='huge'
      />
      <Form.Field control='select' name='hopeOccupation' placeholder='希望職種'>
        <option value='エンジニア'>エンジニア</option>
        <option value='デザイナー'>デザイナー</option>
        <option value='セールス'>セールス</option>
        <option value='カスタマーサクセス'>カスタマーサクセス</option>
        <option value='PM・Webディレクション'>PM・Webディレクション</option>
        <option value='編集・ライティング'>編集・ライティング</option>
        <option value='マーケティング・PR'>マーケティング・PR</option>
        <option value='コンサルティング'>コンサルティング</option>
      </Form.Field>
      <Header
        sub
        color='teal'
        content='希望業界を選択してください'
        size='huge'
      />
      <Form.Field control='select' name='hopeIndustry' placeholder='希望業界'>
        <option value='IT・インターネット・ゲーム'>
          IT・インターネット・ゲーム
        </option>
        <option value='広告・マスコミ・出版'>広告・マスコミ・出版</option>
        <option value='メーカー'>メーカー</option>
        <option value='商社'>商社</option>
        <option value='流通・小売・外食'>流通・小売・外食</option>
        <option value='人材サービス・アウトソーシング・教育'>
          人材サービス・アウトソーシング・教育
        </option>
        <option value='コンサルティング'>コンサルティング</option>
        <option value='金融'>金融</option>
        <option value='不動産・建設・プラント'>不動産・建設・プラント</option>
        <option value='メディカル'>メディカル</option>
        <option value='運輸・物流'>運輸・物流</option>
        <option value='その他（インフラ、エネルギー、官公庁など）'>
          その他（インフラ、エネルギー、官公庁など）
        </option>
      </Form.Field>

      <Header color='teal' content='転職意向' size='huge' />
      <div style={{ display: "flex" }}>
        <div>
          <Header sub color='teal' content='入社希望時期' size='huge' />
          <Form.Field
            control='select'
            name='hopeJoinSeason'
            placeholder='入社希望時期'
            style={{ width: 400 }}
          >
            <option value='3ヶ月以内'>3ヶ月以内</option>
            <option value='6ヶ月以内'>6ヶ月以内</option>
            <option value='1年以内'>1年以内</option>
            <option value='未定'>未定</option>
          </Form.Field>
        </div>
        <div>
          <Header sub color='teal' content='転職回数' size='huge' />
          <Form.Field
            control='select'
            name='numberOfJobChanges'
            placeholder='転職回数'
            style={{ width: 400 }}
          >
            <option value='0回'>0回</option>
            <option value='1回'>1回</option>
            <option value='2回'>2回</option>
            <option value='3回'>3回</option>
            <option value='4回'>4回</option>
            <option value='5回'>5回</option>
            <option value='6回'>6回</option>
            <option value='7回'>7回</option>
            <option value='8回'>8回</option>
            <option value='9回'>9回</option>
            <option value='10回以上'>10回以上</option>
          </Form.Field>
        </div>
      </div>
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
