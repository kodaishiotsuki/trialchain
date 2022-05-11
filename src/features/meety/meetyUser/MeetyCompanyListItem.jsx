import React from 'react'
import { Link } from 'react-router-dom';
import { Button, Image, Item, List, Segment } from 'semantic-ui-react';

export default function MeetyCompanyListItem({ meety }) {
  return (
    <Segment.Group style={{width:800}}>
      <Segment>
        <Item.Group>
          <Item>
            <Image
              size='tiny'
              rounded
              src={meety.hostPhotoUrl || null}
              style={{ maxHeight: 250, width: 250 }}
            />
            <Item.Content>
              <Item.Header
                content={meety.meetyTitle}
                style={{ fontSize: 25, paddingTop: 20 }}
              />
              <br />
              <br />
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Item.Content
                  className='ui teal label'
                  content={`${meety.companyName}の中の人`}
                  style={{ fontSize: 17 }}
                />
                <Item.Content
                  className='ui teal label'
                  content={`職種：${meety.hostOccupation}`}
                  style={{ fontSize: 17 }}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: 10,
                }}
              >
                <Item.Content
                  className='ui teal label'
                  content={`${meety.meetyRecommendPeople}と話したい`}
                  style={{ fontSize: 17 }}
                />
                <Item.Content
                  className='ui teal  label'
                  content={`面談時間：${meety.meetyTime}`}
                  style={{ fontSize: 17 }}
                />
              </div>

              <div style={{ marginTop: 10 }}>
                <Item.Content
                  className='ui label'
                  content='詳細'
                  style={{ fontSize: 13 }}
                />
                <Item.Description>{meety.meetyDescription}</Item.Description>
              </div>
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
      <Segment secondary>
        <List horizontal></List>
      </Segment>
      <Segment clearing style={{ maxHeight: 65 }}>
        <Button
          as={Link}
          to={`/profile/${meety.hostUid}`}
          // color='teal'
          floated='right'
          content='プロフィール'
          style={{
            fontSize: 20,
            paddingTop: 10,
            paddingBottom: 10,
            paddingLeft: 20,
            paddingRight: 20,
            marginRight: 10,
            marginBottom: 10,
          }}
        />
      </Segment>
    </Segment.Group>
  );
}
