import React, { useState } from "react";
import { Tab } from "semantic-ui-react";
import AboutTab from "./AboutTab";
import FollowingTab from "./FollowingTab";
import PhotosTab from "./PhotosTab";

export default function ProfileContent({ profile, isCurrentUser }) {
  const [activeTab, setActiveTab] = useState(0);
  const panes = [
    {
      menuItem: "About",
      render: () => (
        <AboutTab profile={profile} isCurrentUser={isCurrentUser} />
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
