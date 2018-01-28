// @flow

export class SoundException extends Error {
  constructor(message: string) {
    super();
    this.name = 'SoundException';
    this.message = message || 'A sound-error occured.';
  }
}

export class WorkerException extends Error {
  constructor(message: string) {
    super();
    this.name = 'WorkerException';
    this.message = message || 'A worker-error occured.';
  }
}

export default null;
