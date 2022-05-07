import React from "react";
import { Grid } from "semantic-ui-react";
import CompanyHomeContent from "./CompanyHomeContent";
import CompanyHomeHeader from "./CompanyHomeHeader";

export default function CompanyHomePage() {
  return (
    <>
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
