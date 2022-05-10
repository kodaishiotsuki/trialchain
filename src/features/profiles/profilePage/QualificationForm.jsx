import { doc, getFirestore, updateDoc } from 'firebase/firestore';
import React, { useState } from 'react'
import { Button, Form, Header } from 'semantic-ui-react';
import { app } from '../../../app/config/firebase';

export default function QualificationForm({ profile }) {
  // console.log(profile);
  const db = getFirestore(app);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    setLoading(true);
    event.preventDefault();
    const {
      educationalBackground,
      educationalBackgroundName,
      undergraduate,
      undergraduateCourse,
      yearOfAdmission,
      yearOfGraduation,
      language,
      languageLevel,
      license,
    } = event.target.elements;
    await updateDoc(doc(db, "users", profile.userUid), {
      educationalBackground: educationalBackground.value,
      educationalBackgroundName: educationalBackgroundName.value,
      undergraduate: undergraduate.value,
      undergraduateCourse: undergraduateCourse.value,
      yearOfAdmission: yearOfAdmission.value,
      yearOfGraduation: yearOfGraduation.value,
      language: language.value,
      languageLevel: languageLevel.value,
      license: license.value
    });
    return setLoading(false);
  };

  return (
    <Form className='ui form' onSubmit={handleSubmit}>
      <Header
        sub
        color='teal'
        content='最終学歴を選択してください'
        size='huge'
      />
      <Form.Field
        control='select'
        name='educationalBackground'
        placeholder='最終学歴'
      >
        <option value='大学院卒'>大学院卒</option>
        <option value='大学卒'>大学卒</option>
        <option value='短大卒'>短大卒</option>
        <option value='高専卒'>高専卒</option>
        <option value='高校卒'>高校卒</option>
        <option value='専門学校卒'>専門学校卒</option>
      </Form.Field>
      <Header
        sub
        color='teal'
        content='最終学歴（学校名）を選択してください'
        size='huge'
      />
      <Form.Field
        control='input'
        name='educationalBackgroundName'
        placeholder='最終学歴（学校名）'
      ></Form.Field>
      <Header
        sub
        color='teal'
        content='学部/専攻を入力してください'
        size='huge'
      />
      <Form.Field
        control='input'
        name='undergraduate'
        placeholder='学部/専攻'
      />
      <Header sub color='teal' content='学科を入力してください' size='huge' />
      <Form.Field
        control='input'
        name='undergraduateCourse'
        placeholder='学科'
      />
      <div style={{ display: "flex" }}>
        <div>
          <Header sub color='teal' content='入学年度' size='huge' />
          <Form.Field
            control='select'
            name='yearOfAdmission'
            placeholder='入学年度'
            style={{ width: 400 }}
          >
            <option value='2010'>2010</option>
            <option value='2011'>2011</option>
            <option value='2012'>2012</option>
            <option value='2013'>2013</option>
            <option value='2014'>2014</option>
            <option value='2015'>2015</option>
            <option value='2016'>2016</option>
            <option value='2017'>2017</option>
            <option value='2018'>2018</option>
            <option value='2019'>2019</option>
            <option value='2020'>2020</option>
            <option value='2021'>2021</option>
            <option value='2022'>2022</option>
            <option value='2023'>2023</option>
          </Form.Field>
        </div>
        <div>
          <Header sub color='teal' content='卒業年度' size='huge' />
          <Form.Field
            control='select'
            name='yearOfGraduation'
            placeholder='卒業年度'
            style={{ width: 400 }}
          >
            <option value='2010'>2010</option>
            <option value='2011'>2011</option>
            <option value='2012'>2012</option>
            <option value='2013'>2013</option>
            <option value='2014'>2014</option>
            <option value='2015'>2015</option>
            <option value='2016'>2016</option>
            <option value='2017'>2017</option>
            <option value='2018'>2018</option>
            <option value='2019'>2019</option>
            <option value='2020'>2020</option>
            <option value='2021'>2021</option>
            <option value='2022'>2022</option>
            <option value='2023'>2023</option>
          </Form.Field>
        </div>
      </div>

      <Header color='teal' content='言語' size='huge' />
      <div style={{ display: "flex" }}>
        <div>
          <Header sub color='teal' content='言語' size='huge' />
          <Form.Field
            control='select'
            name='language'
            placeholder='言語'
            style={{ width: 400 }}
          >
            <option value='英語'>英語</option>
            <option value='中国語'>中国語</option>
            <option value='韓国語'>韓国語</option>
            <option value='フランス語'>フランス語</option>
            <option value='ドイツ語'>ドイツ語</option>
            <option value='スペイン語'>スペイン語</option>
            <option value='イタリア語'>イタリア語</option>
            <option value='オランダ語'>オランダ語</option>
            <option value='スウェーデン語'>スウェーデン語</option>
            <option value='ロシア語'>ロシア語</option>
            <option value='ポルトガル語'>ポルトガル語</option>
            <option value='タイ語'>タイ語</option>
            <option value='マレーシア語'>マレーシア語</option>
            <option value='ベトナム語'>ベトナム語</option>
            <option value='その他'>その他</option>
          </Form.Field>
        </div>
        <div>
          <Header sub color='teal' content='習得レベル' size='huge' />
          <Form.Field
            control='select'
            name='languageLevel'
            placeholder='習得レベル'
            style={{ width: 400 }}
          >
            <option value='ネイティブ'>ネイティブ</option>
            <option value='ビジネスレベル'>ビジネスレベル</option>
            <option value='日常会話レベル'>日常会話レベル</option>
          </Form.Field>
        </div>
      </div>
      <Header color='teal' content='保有資格' size='huge' />
      <Header
        sub
        color='teal'
        content='保有資格を入力してください'
        size='huge'
      />
      <Form.Field control='input' name='license' placeholder='保有資格' />
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
