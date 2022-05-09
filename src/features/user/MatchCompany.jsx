import React, { useState } from "react";
import { Icon, Tab } from "semantic-ui-react";
import MatchOfferCompanyList from "./MatchOfferCompanyList";
import TrialResult from "./TrialResult";

export default function MatchCompany() {
  //タブメニュー
  const [activeTab, setActiveTab] = useState(0);

  //Tab内容
  const panes = [
    {
      menuItem: "応募した企業リスト",
      render: () => <TrialResult activeTab={activeTab} />,
    },
    {
      menuItem: "オファーがあった企業リスト",
      render: () => <MatchOfferCompanyList activeTab={activeTab} />,
    },
  ];

  return (
    <>
      <div style={{ textAlign: "center", marginBottom: 20, display: "flex" }}>
        <Icon name='teal envelope' size='huge' />
        <h1>メッセージ一覧</h1>
      </div>
      <Tab
        panes={panes}
        onTabChange={(e, data) => setActiveTab(data.activeIndex)}
      />
    </>
  );
}
