// @flow

import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import Button from '../../../../elements/button';
import Icon from '../../../icons';
import { getCustomDrumkitSound } from '../../../../store/selectors/drumkit';
import { saveCustomDrumkit } from '../../../../store/actions/drumkit';
import type { GlobalState } from '../../../../store/types';
import PlaySound from '../../../../helpers/playSound';
import { UploadWrapper, FileInput, FileInputButton, UploadLabel } from './upload.styled';
import TextInput from '../../../../elements/textInput';

type stateProps = {
  customSound: Object,
};

type DispatchProps = {
  setCustomValue: Function,
};

type OwnProps = {
  sound: string,
}

type Props = OwnProps & stateProps & DispatchProps;

class SoundUpload extends Component<Props, *> {
  componentWillMount() {
    this.sample = new PlaySound();
  }

  setBlob = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      this.props.setCustomValue(file.name, reader.result);
    };

    if (file) {
      reader.readAsArrayBuffer(file);
    }
  }

  setSoundName = (event) => {
    this.props.setCustomValue('sound', event.target.value);
  }

  playSample = () => {
    if (this.sample) {
      this.sample.play(this.props.customSound.blob.slice(0));
    }
  }

  sample: PlaySound;

  render() {
    const { customSound, sound } = this.props;
    return (
      <UploadWrapper>
        {customSound && (
          <Fragment>
            <UploadLabel>
              {sound}
            </UploadLabel>
            <TextInput
              type="text"
              value={customSound.name}
              onChange={this.setSoundName}
              readOnly
            />
            <FileInputButton
              color={customSound.blob !== null ? 'green' : 'white'}
              active={customSound.blob !== null}
              for={`${sound}-file`}
              size="small"
            >
              <FileInput
                id={`${sound}-file`}
                name={`${sound}-file`}
                type="file"
                onChange={this.setBlob}
                color="white"
              />
              Select
            </FileInputButton>
            <Button
              size="small"
              onClick={() => this.playSample()}
            >
              <Icon icon="play" />
            </Button>
          </Fragment>
        )}
      </UploadWrapper>
    );
  }
}
const mapStateToProps = (state: GlobalState, ownProps: OwnProps): stateProps => ({
  customSound: getCustomDrumkitSound(state, ownProps.sound),
});

const mapDispatchToProps = (dispatch: Dispatch<*>, ownProps: OwnProps) => ({
  setCustomValue: (name: string, blob: ArrayBuffer) =>
    dispatch(saveCustomDrumkit(ownProps.sound, name, blob)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SoundUpload);
