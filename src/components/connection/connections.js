// @flow

import React from 'react';
import {
  Container,
  Title,
  Content,
  Status,
  StatusTitle,
  Switch,
} from './atoms';
import Led from '../../elements/led';
import Button from '../../elements/button';

export default () => (
  <Container>
    <Title>Connection</Title>
    <Content>
      <Switch>
        <Button
          color="green"
          active={false}
        >
          &#9901;
        </Button>
        <Button
          active={false}
          color="white"
        >
          &#9999;
        </Button>
      </Switch>
      <Status>
        <StatusTitle>Status</StatusTitle>
        <Led
          label="Connected"
          active={false}
          color="green"
        />
        <Led
          label="Send"
          color="blue"
          active={false}
        />
        <Led
          label="Receive"
          color="red"
          active={false}
        />
      </Status>
    </Content>
  </Container>
);
