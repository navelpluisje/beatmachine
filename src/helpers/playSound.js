// @flow
/* global document, fetch */

export default class PlaySound {
  constructor() {
    this.playing = false;
  }

  playing: boolean;

  async play(arrayBuffer: ArrayBuffer) {
    // If we already are playing, do not interrupt
    if (this.playing) {
      return;
    }
    this.playing = true;
    const AudioContext = window.AudioContext || window.webkitAudioContext || false;

    if (!AudioContext) {
      return null;
    }
    const ac = new AudioContext();
    const bufferSource = await ac.decodeAudioData(arrayBuffer);

    const acGain = ac.createGain();
    acGain.gain.setTargetAtTime(0.8, ac.currentTime, 0);

    const acSound = ac.createBufferSource();
    acSound.buffer = bufferSource;
    acSound.connect(acGain);

    acGain.connect(ac.destination);

    /**
    * Play the sound
    */
    acSound.start(0);
    // If the sound ends, we close the context and toggle the play state
    acSound.onended = () => {
      ac.close();
      this.playing = false;
    };
  }
}
