import React from "react";
import { Card } from "semantic-ui-react";

export default function TrialResult({ profile }) {
  return (
    <>
      {profile?.trialCompany &&
        profile?.trialMonth &&
          (
            <Card style={{ width: "30%", margin: 8 }}>
              <Card.Content>
                {profile?.trialCompany.map((trialCom) => (
                  <Card.Header key={`my${trialCom?.id}`}>
                    {trialCom}
                  </Card.Header>
                ))}
                {profile?.trialMonth.map((trialMon) => (
                  <Card.Content
                    key={`my${trialMon?.id}`}
                    className='ui teal tag label'
                    content={`トライアル期間:${trialMon}ヶ月`}
                    style={{ marginTop: 5 }}
                  />
                ))}
              </Card.Content>
            </Card>
          )}
    </>
  );
}
