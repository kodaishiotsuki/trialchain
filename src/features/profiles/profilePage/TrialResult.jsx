import React from "react";
import { Card, Label } from "semantic-ui-react";

export default function TrialResult({ profile }) {
  // console.log(profile)
  return (
    <>
      <Card.Group itemsPerRow={3}>
        {profile?.trialCompany && profile?.trialMonth && (
          <Card style={{ marginTop: 30 }}>
            <Card.Content>
              {profile?.trialCompany.map((trialCom) => (
                <Card.Header
                  key={`my${trialCom?.id}`}
                  style={{ textAlign: "center" }}
                  content={trialCom}
                />
              ))}
              {profile?.trialMonth.map((trialMon) => (
                <Label
                  style={{ top: 5 }}
                  color='teal'
                  ribbon='right'
                  content={`トライアル期間:${trialMon}ヶ月`}
                  key={`my${trialMon?.id}`}
                />
              ))}
              <hr />
              {profile?.trialJobOccupation.map((trialOcc) => (
                <Card.Content
                  key={`my${trialOcc?.id}`}
                  content={`【職種】${trialOcc}`}
                  style={{ fontWeight: "bold", marginTop: 5 }}
                />
              ))}
              <hr />
              {profile?.trialJobSkill.map((trialSkill) => (
                <Card.Content
                  key={`my${trialSkill?.id}`}
                  content={`【スキル】${trialSkill}`}
                  style={{ fontWeight: "bold", marginTop: 5 }}
                />
              ))}
              <hr />
              {profile?.trialJobDescription.map((trialDesc) => (
                <Card.Content
                  key={`my${trialDesc?.id}`}
                  content={`【経験したこと】${trialDesc}`}
                  style={{ fontWeight: "bold", marginTop: 5 }}
                />
              ))}
            </Card.Content>
          </Card>
        )}
      </Card.Group>
    </>
  );
}
