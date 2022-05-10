import React from "react";
import { Grid, Header, Tab } from "semantic-ui-react";
import TrialResult from "./TrialResult";

export default function UserTrialTab({ profile }) {
  return (
    <Tab.Pane>
      <Grid>
        <Grid.Column width={16} style={{ height: 40 }}>
          <Header
            floated='left'
            icon='id card outline'
            content='トライアル採用歴（採用した企業が記載したものです）'
            style={{ padding: 5 }}
          />
        </Grid.Column>
        <Grid.Column width={16}>
          <TrialResult profile={profile} />
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  );
}
