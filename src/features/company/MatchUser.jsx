import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { Icon, Tab } from "semantic-ui-react";
import MatchOfferUserList from "./MatchOfferUserList";
import MatchUserListItem from "./MatchUserListItem";

export default function MatchUser({ match, history, location }) {
  const { error } = useSelector((state) => state.async);
  //タブメニュー
  const [activeTab, setActiveTab] = useState(0);

  //Tab内容
  const panes = [
    {
      menuItem: "応募があった求職者リスト",
      render: () => <MatchUserListItem activeTab={activeTab} />,
    },
    {
      menuItem: "オファーした求職者リスト",
      render: () => <MatchOfferUserList activeTab={activeTab} />,
    },
  ];

  //エラーが発生した場合はリダイレクト
  if (error) return <Redirect to='/error' />;

  return (
    <>
      <div style={{ textAlign: "center", marginBottom: 20, display: "flex" }}>
        <Icon name='teal users' size='huge' />
        <h1>メッセージ一覧</h1>
      </div>

      <Tab
        menu={{ fluid: true, vertical: true }}
        menuPosition='right'
        panes={panes}
        onTabChange={(e, data) => setActiveTab(data.activeIndex)}
      />
    </>
  );
}
