import React from "react";
import { Tab } from "semantic-ui-react";
import PhotosTab from "../profiles/profilePage/PhotosTab";
import UserTrialTab from "../profiles/profilePage/UserTrialTab";
import UserAboutTab from "./UserAboutTab";

export default function TrialUserProfileContent({ profile, isCurrentUser }) {
  // const [activeTab, setActiveTab] = useState(0);
  const panes = [
    {
      menuItem: "プロフィール",
      render: () => (
        <UserAboutTab profile={profile} isCurrentUser={isCurrentUser} />
      ),
    },
    {
      menuItem: "トライアル採用歴",
      render: () => (
        <UserTrialTab profile={profile} isCurrentUser={isCurrentUser} />
      ),
    },
    {
      menuItem: "職歴 / 学歴",
      render: () => (
        <UserAboutTab profile={profile} isCurrentUser={isCurrentUser} />
      ),
    },
    {
      menuItem: "スキル / 特徴",
      render: () => (
        <UserAboutTab profile={profile} isCurrentUser={isCurrentUser} />
      ),
    },
    {
      menuItem: "写真",
      render: () => (
        <PhotosTab profile={profile} isCurrentUser={isCurrentUser} />
      ),
    },
  ];
  return (
    <Tab
      menu={{ fluid: true, vertical: true }}
      menuPosition='right'
      panes={panes}
      // onTabChange={(e, data) => setActiveTab(data.activeIndex)}
    />
  );
}
