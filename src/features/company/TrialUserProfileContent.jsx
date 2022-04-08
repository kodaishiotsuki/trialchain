import React, { useState } from "react";
import { Tab } from "semantic-ui-react";
import FollowingTab from "../profiles/profilePage/FollowingTab";
import PhotosTab from "../profiles/profilePage/PhotosTab";
import UserAboutTab from "./UserAboutTab";


export default function TrialUserProfileContent({ profile, isCurrentUser }) {
  const [activeTab, setActiveTab] = useState(0);
  const panes = [
    {
      menuItem: "About",
      render: () => (
        <UserAboutTab profile={profile} isCurrentUser={isCurrentUser} />
      ),
    },
    {
      menuItem: "Photos",
      render: () => (
        <PhotosTab profile={profile} isCurrentUser={isCurrentUser} />
      ),
    },
    { menuItem: "Events", render: () => <Tab.Pane>Events</Tab.Pane> },
    {
      menuItem: "Followers",
      render: () => (
        <FollowingTab
          profile={profile}
          activeTab={activeTab}
          key={profile.id} //ユーザー切り替え時に再レンダリング防止
        />
      ),
    },
    {
      menuItem: "Following",
      render: () => (
        <FollowingTab
          profile={profile}
          activeTab={activeTab}
          key={profile.id} //ユーザー切り替え時に再レンダリング防止
        />
      ),
    },
  ];
  return (
    <Tab
      menu={{ fluid: true, vertical: true }}
      menuPosition='right'
      panes={panes}
      onTabChange={(e, data) => setActiveTab(data.activeIndex)}
    />
  );
}
