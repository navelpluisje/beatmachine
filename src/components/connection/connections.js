// @flow

import React from 'react';
import {
  Container,
  Title,
  Content,
  Switch,
  GridSettings,
  GridButton,
  DrumkitButton,
  SettingsButton,
  ConnectionButton,
  ConnectionStatus,
} from './components';

const Connection = () => (
  <Container>
    <Title>Connection</Title>
    <Content>
      <Switch>
        <ConnectionButton />
        <SettingsButton />
      </Switch>
      <ConnectionStatus />
    </Content>
    <GridSettings>
      <GridButton />
      <DrumkitButton />
    </GridSettings>
  </Container>
);

export default Connection;
