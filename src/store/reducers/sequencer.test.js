import sequencer from './sequencer';
import {
  INITIAL_SETTINGS,
  SEQUENCER_SET_SPEED,
  SEQUENCER_SET_RUNNING,
  SEQUENCER_SET_STEP_COUNT,
} from '../constants';

describe('aSync actions', () => {
  it('checks initial settings', () => {
    expect(sequencer(false, { type: INITIAL_SETTINGS })).toMatchSnapshot();
  });

  it('checks setting the speed', () => {
    expect(sequencer(false, { type: SEQUENCER_SET_SPEED })).toMatchSnapshot();
  });

  it('checks setting running', () => {
    expect(sequencer(false, { type: SEQUENCER_SET_RUNNING })).toMatchSnapshot();
  });

  it('checks setting stepcount', () => {
    expect(sequencer(false, { type: SEQUENCER_SET_STEP_COUNT })).toMatchSnapshot();
  });
});
