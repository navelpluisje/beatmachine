/* global document, fetch */

export default class Sound {
  constructor(drumkit, sound, ac) {
    this.ac = ac;
    this.buffer = null;
    this.sound = sound || 'kick';
    this.drumkit = drumkit;
    this.mute = false;
    this.soloMute = false;
    this.gain = 0.7;
    this.pan = 0;
    this.filter = false;
    this.filterQ = 1;
    this.filterFreq = 8000;

    this.getFile();
  }

  setValues(values, master) {
    this.mute = values.mute;
    this.soloMute = values.soloMute;
    this.gain = values.gain * master.volume;
    this.pan = values.pan;
    this.filter = values.filter;
    this.filterQ = values.filterQ;
    this.filterFreq = values.filterFreq;
    this.hasDistortion = master.hasDistortion;
    this.distortion = master.distortion;
    this.hasReverb = master.hasReverb;
  }

  setDrumkit(drumkit) {
    this.drumkit = drumkit;
    this.getFile();
  }

  getFile() {
    fetch(`sounds/${this.drumkit}/${this.sound}.wav`)
      .then(response => response.arrayBuffer())
      .then((arrayBuffer) => {
        this.ac.decodeAudioData(arrayBuffer, (buffer) => {
          this.buffer = null;
          this.buffer = buffer;
        });
      });
  }

  setSound() {
    this.getFile();
  }

  play(settings, master) {
    if (typeof settings === 'object') {
      this.setValues(settings, master);
    }
    /**
    * Create the buffersource and fill it with our buffer
    */
    const acSound = this.ac.createBufferSource();
    const acDistortion = this.ac.createWaveShaper();
    const acPanner = this.ac.createStereoPanner();
    const acGain = this.ac.createGain();
    const acFilter = this.ac.createBiquadFilter();

    acSound.buffer = this.buffer;

    if (this.hasDistortion) {
      acDistortion.curve = Sound.makeDistortionCurve(this.distortion);
      acDistortion.oversample = '4x';
    }

    if (this.ac.createStereoPanner !== undefined) {
      acPanner.pan.value = this.pan;
    }

    if (this.mute || this.soloMute) {
      acGain.gain.value = 0;
    } else {
      acGain.gain.value = this.gain;
    }

    if (this.filter) {
      acFilter.Q.value = this.filterQ;
      acFilter.frequency.value = this.filterFreq;
    }

    acSound.connect(acPanner);
    acPanner.connect(acDistortion);
    if (this.filter) {
      acDistortion.connect(acFilter);
      acFilter.connect(acGain);
    } else {
      acDistortion.connect(acGain);
    }
    acGain.connect(this.ac.destination);

    /**
    * Play the sound
    */
    acSound.start(0);
  }

  static makeDistortionCurve(amount) {
    const k = typeof amount === 'number' ? amount : 50;
    const sampleRate = 44100;
    const curve = new Float32Array(sampleRate);
    const deg = Math.PI / 180;

    for (let i = 0; i < sampleRate; i += 1) {
      const x = ((i * 2) / sampleRate) - 1;
      curve[i] = ((3 + k) * x * 20 * deg) / (Math.PI + (k * Math.abs(x)));
    }
    return curve;
  }

  // http://stackoverflow.com/questions/21797299/convert-base64-string-to-arraybuffer
  static base64ToArrayBuffer(base64) {
    const binaryString = window.atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i += 1) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes.buffer;
  }
}
