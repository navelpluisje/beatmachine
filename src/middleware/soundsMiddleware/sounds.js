// @flow

import Sound from './sound';
import { SoundException } from '../helpers';
import type {
  Sounds as SoundsType,
  Sound as SoundType,
} from './types';
import type { MasterState } from '../../store/types';

export default class Sounds {
  ac: ?AudioContext;
  drumkit: string;
  sounds: SoundsType;
  soundsList: {
    [sound: string]: typeof Sound,
  }

  constructor(drumkit: string, sounds: SoundsType) {
    this.ac = null;
    this.checkAudioContext();
    this.drumkit = drumkit;
    this.sounds = sounds;
    this.setSounds();
  }

  checkAudioContext() {
    let Context = null;
    try {
      Context = window.AudioContext || window.webkitAudioContext || false;
      if (Context) {
        this.ac = new Context();
      }
      return true;
    } catch (e) {
      throw new SoundException('This app doesn\'t seem to be available for your browser. Sorry about that. We recommend Firefox or Chrome');
    }
  }

  setSounds() {
    this.soundsList = this.sounds.reduce((accumulator, sound) => ({
      ...accumulator,
      [sound]: new Sound(this.drumkit, sound, this.ac),
    }), {});
  }

  playAll(sounds: Array<SoundType>, master: MasterState) {
    sounds.forEach(sound => this.play(sound, master));
  }

  play({ sound, settings }: SoundType, master: MasterState) {
    this.soundsList[sound].play(settings, master);
  }

  setDrumkit(drumkit: string) {
    this.drumkit = drumkit;
    this.sounds.forEach(sound => this.soundsList[sound].setDrumkit(drumkit));
  }
}
