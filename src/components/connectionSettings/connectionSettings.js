// @flow

import React from 'react';
import SettingsContainer, {
  SettingsForm,
  Title,
} from './connectionSettings.styled';
import {
  Form,
  Explanation,
} from './atoms';

export default () => (
  <SettingsContainer>
    <SettingsForm>
      <Title>Connection Settings</Title>
      <Form />
    </SettingsForm>
    <Explanation />
  </SettingsContainer>
);
