import React from "react";
import {
  Button,
  Container,
  Header,
  Icon,
  Image,
  Segment,
} from "semantic-ui-react";

export default function HomePage({history}) {
  return (
    <Segment inverted textAlign='center' vertical className='masthead'>
      <Container>
        <Header as='h1' inverted>
          <Image
            size='massive'
            src='/assets/logo.png'
            style={{ marginBottom: 12 }}
          />
          Match Hub
        </Header>
        {/* history.push→アクションを起こした時にページ遷移 */}
        <Button onClick={()=>history.push('/events')} size='huge' inverted>
          Get started
          <Icon name='right arrow' inverted/>
        </Button>
      </Container>
    </Segment>
  );
}
