import { setInputs } from '../../store/midi/actions';
import { playSingleSound, setSetting, toggleSetting } from '../../store/sounds/actions';
import { setNextDrumkit } from '../../store/drumkit/actions';

const NOTE_ON = '9';
// const NOTE_OFF = '8';
const CONTROL_CHANGE = 'b';
const PROGRAM_CHANGE = 'c';
const SOUNDS = {
  36: 'kick',
  37: 'snare',
  38: 'rim',
  39: 'hat',
  40: 'hat2',
  41: 'clap',
  42: 'crash',
  43: 'ride',
};
const CONTROLS = {
  1: {
    name: 'gain',
    type: 'set',
    min: 0,
    max: 1,
    factor: 100,
  },
  2: {
    name: 'filter',
    type: 'toggle',
  },
  3: {
    name: 'filterQ',
    type: 'set',
    min: 0,
    max: 35,
    factor: 35,
  },
  4: {
    name: 'filterFreq',
    type: 'set',
    min: 50,
    max: 8050,
    factor: 100,
  },
  5: {
    name: 'solo',
    type: 'toggle',
  },
  6: {
    name: 'mute',
    type: 'toggle',
  },
  7: {
    name: 'pan',
    type: 'set',
    min: -1,
    max: 1,
    factor: 100,
  },
};

class MidiHandler {
  constructor(dispatch) {
    this.port = null;
    this.dispatch = dispatch;
    this.getAccess();
  }

  getAccess = async () => {
    const midiAccess = await navigator.requestMIDIAccess();
    if (midiAccess.inputs) {
      this.onMIDISuccess(midiAccess);
    } else {
      console.warn('Whaaaaat, no MIDI inputs available');
    }
    midiAccess.onstatechange = this.onConnectionChange;
  }

  onConnectionChange = (connectionEvent) => {
    const midiAccess = connectionEvent.target;
    this.onMIDISuccess(midiAccess);
  }

  onMIDISuccess = (midiAccess) => {
    this.inputs = Array
      .from(midiAccess.inputs)
      .map(input => input[1]);
    this.outputs = Array
      .from(midiAccess.outputs)
      .map(output => output[1]);

    this.dispatch(setInputs(this.inputs.map(({ id, name }) => ({
      id,
      name,
    }))));
  }

  setMidiDevice(id) {
    const input = this.inputs.filter(inp => inp.id === id);
    const output = this.outputs.filter(outp => outp.id === id);
    if (input.length > 0) {
      [this.input] = input;
    }
    this.input.onmidimessage = message => this.handleMidiMessage(message);
    if (output.length > 0) {
      [this.output] = output;
    }
  }

  setMidiPort(port) {
    if (port === 0) {
      this.port = null;
    } else {
      this.port = (port - 1).toString(16);
    }
  }

  static substractCommand(command) {
    const [cmd, port] = command.toString(16);
    return {
      cmd,
      port,
    };
  }

  static splitControlKey(key) {
    const [sound, control] = key.toString();
    return {
      sound,
      control,
    };
  }

  handleMidiMessage(message) {
    const [cmd, key, value] = message.data;
    const command = MidiHandler.substractCommand(cmd);

    if (this.port !== null && command.port !== this.port) {
      return false;
    }

    switch (command.cmd) {
    case NOTE_ON:
      this.dispatch(playSingleSound(SOUNDS[key]));
      break;

    case CONTROL_CHANGE:
      this.setControlChange(key, value);
      break;

    case PROGRAM_CHANGE:
      this.dispatch(setNextDrumkit(key));
      break;
    default:
    }
  }

  setControlChange(key, value) {
    const { sound, control } = MidiHandler.splitControlKey(key);
    const settings = CONTROLS[control];
    if (settings.type === 'set') {
      const val =
        ((Math.abs(settings.min - settings.max) / settings.factor) * value) + settings.min;
      this.dispatch(setSetting(SOUNDS[+sound + 35], settings.name, val));
    }
    if (settings.type === 'toggle' && value > 0) {
      this.dispatch(toggleSetting(SOUNDS[+sound + 35], settings.name));
    }
  }
}

export default MidiHandler;
