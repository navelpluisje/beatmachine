// @flow

export const initializeDatabase = (): Promise<*> => (
  new Promise((resolve, reject) => {
    window.beatMachine = window.beatMachine || {
      hasDb: false,
    };

    const request = window.indexedDB.open('beatMachineDb');
    request.onerror = (event) => {
      console.error('IndexedDb error on creating request', event);
      reject(Error('IndexedDb error on creating request'));
    };

    request.onsuccess = (event) => {
      window.beatMachine.db = event.target.result;
      window.beatMachine.hasDb = true;
      resolve(true);
    };

    request.onupgradeneeded = (event) => {
      const db = event.target.result;

      // Create an objectStore for this database
      db.createObjectStore('drumkit', { keyPath: 'id', autoIncrement: true })
        .createIndex('soundIndex', ['sound', 'drumkit'], { unique: true });

      window.beatMachine.db = db;
      window.beatMachine.hasDb = true;
      resolve(true);
    };
  })
);

export const addSound = (
  sound: string,
  drumkit: string,
  blob: ArrayBuffer,
  callback: Function,
): void => {
  if (!window.beatMachine || !window.beatMachine.hasDb) {
    throw Error('No database for BeatMachine');
  }

  const { db } = window.beatMachine;
  const objectStore: IDBObjectStore = db
    .transaction(['drumkit'], 'readwrite')
    .objectStore('drumkit');

  const request = objectStore.add({
    sound,
    drumkit,
    blob,
  });

  request.onsuccess = callback;
  request.onerror = () => console.error(
    `${request.error.name} while adding ${sound} from ${drumkit}.`,
    request.error.message,
  );
};

export const getSound = (
  sound: string,
  drumkit: string,
  callback: Function,
): void => {
  if (
    !window.beatMachine ||
    !window.beatMachine.db ||
    !window.beatMachine.hasDb
  ) {
    // setTimeout(() => getSound(sound, drumkit, callback), 100);
  }

  const { db } = window.beatMachine;
  const objectStore: IDBObjectStore = db
    .transaction(['drumkit'])
    .objectStore('drumkit')
    .index('soundIndex');

  const request = objectStore.get(IDBKeyRange.only([sound, drumkit]));

  request.onsuccess = callback;
  request.onerror = event => console.error(`Error while retreiving ${sound} from ${drumkit}.`, event);
};

export const replaceSound = (
  sound: string,
  drumkit: string,
  newData: Object,
  callback: Function,
): void => {
  if (!window.beatMachine || !window.beatMachine.hasDb) {
    throw Error('No database for BeatMachine');
  }

  const { db } = window.beatMachine;
  const objectStore: IDBObjectStore = db
    .transaction(['drumkit'], 'readwrite')
    .objectStore('drumkit');

  const requestStore = objectStore.index('soundIndex');
  const request = requestStore.get(IDBKeyRange.only([sound, drumkit]));

  request.onsuccess = ({ srcElement: { result } }) => {
    const data = {
      ...result,
      ...newData,
    };

    objectStore
      .put(data)
      .onsuccess = callback;
  };
};

export default null;
