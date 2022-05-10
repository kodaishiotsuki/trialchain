import React, { useState } from "react";
import { Button, Form, Header } from "semantic-ui-react";
import { doc, getFirestore, updateDoc } from "firebase/firestore";
import { app } from "../../../app/config/firebase";

export default function CareerForm({ profile }) {
  console.log(profile);
  const db = getFirestore(app);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    setLoading(true);
    event.preventDefault();
    const {
      occupation,
      industry,
      careerCompany,
      careerDepartment,
      careerPosition,
      careerStartYear,
      careerStartMonth,
      careerFinishYear,
      careerFinishMonth,
      careerDescription,
    } = event.target.elements;
    await updateDoc(doc(db, "users", profile.userUid), {
      occupation: occupation.value,
      industry: industry.value,
      careerCompany: careerCompany.value,
      careerDepartment: careerDepartment.value,
      careerPosition: careerPosition.value,
      careerStartYear: careerStartYear.value,
      careerStartMonth: careerStartMonth.value,
      careerFinishYear: careerFinishYear.value,
      careerFinishMonth: careerFinishMonth.value,
      careerDescription: careerDescription.value,
    });
    return setLoading(false);
  };

  return (
    <Form className='ui form' onSubmit={handleSubmit}>
      <Header
        sub
        color='teal'
        content='経験した職種を選択してください'
        size='huge'
      />
      <Form.Field
        control='select'
        name='occupation'
        placeholder='経験した職種を選択してください'
        // options={careerData}
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
      <Header
        sub
        color='teal'
        content='経験した業界を選択してください'
        size='huge'
      />
      <Form.Field
        control='select'
        name='industry'
        placeholder='経験した業界を選択してください'
        // options={industryData}
      >
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
      <Header content='職務経歴を入力してください' />
      <Header sub color='teal' content='企業名' size='huge' />
      <Form.Field
        control='input'
        name='careerCompany'
        placeholder='企業名を入力してください'
      />
      <div style={{ display: "flex" }}>
        <div>
          <Header sub color='teal' content='部署' size='huge' />
          <Form.Field
            control='input'
            name='careerDepartment'
            placeholder='部署を入力してください'
            style={{ width: 400 }}
          />
        </div>
        <div>
          <Header sub color='teal' content='役職' size='huge' />
          <Form.Field
            control='input'
            name='careerPosition'
            placeholder='役職を入力してください'
            style={{ width: 400 }}
          />
        </div>
      </div>

      <div style={{ display: "flex", marginTop: 15 }}>
        <div>
          <Header sub color='teal' content='就業開始日' size='huge' />
          <div style={{ display: "flex" }}>
            <Form.Field
              control='select'
              name='careerStartYear'
              placeholder='年'
              style={{ width: 200 }}
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
            <Form.Field
              control='select'
              name='careerStartMonth'
              placeholder='月'
              style={{ width: 200 }}
              // options={monthData}
            >
              <option value='1'>1</option>
              <option value='2'>2</option>
              <option value='3'>3</option>
              <option value='4'>4</option>
              <option value='5'>5</option>
              <option value='6'>6</option>
              <option value='7'>7</option>
              <option value='8'>8</option>
              <option value='9'>9</option>
              <option value='10'>10</option>
              <option value='11'>11</option>
              <option value='12'>12</option>
            </Form.Field>
          </div>
        </div>
        <div>
          <Header sub color='teal' content='就業終了日' size='huge' />
          <div style={{ display: "flex" }}>
            <Form.Field
              control='select'
              name='careerFinishYear'
              placeholder='年'
              style={{ width: 200 }}
              // options={yearData}
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
            <Form.Field
              control='select'
              name='careerFinishMonth'
              placeholder='月'
              style={{ width: 200 }}
              // options={monthData}
            >
              <option value='1'>1</option>
              <option value='2'>2</option>
              <option value='3'>3</option>
              <option value='4'>4</option>
              <option value='5'>5</option>
              <option value='6'>6</option>
              <option value='7'>7</option>
              <option value='8'>8</option>
              <option value='9'>9</option>
              <option value='10'>10</option>
              <option value='11'>11</option>
              <option value='12'>12</option>
            </Form.Field>
          </div>
        </div>
      </div>
      <Header sub color='teal' content='経歴の詳細' size='huge' />
      <Form.Field
        control='textarea'
        name='careerDescription'
        placeholder='経歴の詳細'
      />
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
