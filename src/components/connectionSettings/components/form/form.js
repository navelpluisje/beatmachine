// @flow

import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import Label from '../../../../elements/label';
import TextInput from '../../../../elements/textInput';
import Button from '../../../../elements/button';
import Icon from '../../../icons';
import { getUrl } from '../../../../store/ddp/selectors';
import { setDDPUrl, reConnect } from '../../../../store/ddp/actions';

type StateProps = {
  url: string,
};

type DispatchProps = {
  setUrl: Function,
  reconnect: Function,
};

type Props = StateProps & DispatchProps;

const Form = ({ url, setUrl, reconnect }: Props) => (
  <Fragment>
    <Label>Url</Label>
    <TextInput
      value={url}
      onChange={setUrl}
    />
    <Button
      onClick={reconnect}
    >
      <Icon icon="connect" />
    </Button>
  </Fragment>
);

const mapStateToProps = (state: *): StateProps => ({
  url: getUrl(state),
});

const mapDispatchProps = (dispatch: Dispatch<*>): DispatchProps => ({
  setUrl: (evt: Event) => {
    const { target } = evt;
    if (target instanceof HTMLInputElement) {
      dispatch(setDDPUrl(target.value));
    }
  },
  reconnect: () => dispatch(reConnect()),
});

export default connect(mapStateToProps, mapDispatchProps)(Form);
