import React from "react";
import {
  Button,
  Container,
  Header,
  Icon,
  Segment,
} from "semantic-ui-react";

export default function HomePage({ history }) {
  return (
    <Segment inverted textAlign='center' vertical className='masthead'>
      <Container>
        <Header as='h1' inverted>
          <Icon name='chain' />
          Trial Chain
        </Header>

        {/* history.push→アクションを起こした時にページ遷移 */}
        <Button onClick={() => history.push("/events")} size='huge' inverted>
          Get started
          <Icon name='right arrow' inverted />
        </Button>
      </Container>
    </Segment>
  );
}
