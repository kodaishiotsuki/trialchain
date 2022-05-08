import React from "react";
import { Grid, Icon } from "semantic-ui-react";
import CompanyHomeContent from "./CompanyHomeContent";
import CompanyHomeHeader from "./CompanyHomeHeader";

export default function CompanyHomePage() {
  return (
    <>
      <div style={{ textAlign: "center", marginBottom: 20,display:"flex" }}>
        <Icon name='blue home' size='huge' />
        <h1>HOME画面</h1>
      </div>

      <Grid>
        <Grid.Column width={5}>
          <CompanyHomeHeader />
        </Grid.Column>
        <Grid.Column width={11}>
          <CompanyHomeContent />
        </Grid.Column>
      </Grid>
    </>
  );
}
