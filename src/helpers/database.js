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
      const { transaction } = event.target;

      // Create an objectStore for this database
      db.createObjectStore('drumkit', { keyPath: 'id', autoIncrement: true })
        .createIndex('soundIndex', ['sound', 'drumkit'], { unique: true });

      window.beatMachine.db = db;
      window.beatMachine.hasDb = true;

      transaction.oncomplete = () => resolve(true);
    };
  })
);

export const addSound = (drumkit: Object): Promise<*> => (
  new Promise((resolve, reject) => {
    if (!window.beatMachine || !window.beatMachine.hasDb) {
      reject(Error('No database for BeatMachine'));
    }

    const { db } = window.beatMachine;
    const objectStore: IDBObjectStore = db
      .transaction(['drumkit'], 'readwrite')
      .objectStore('drumkit');

    const request = objectStore.put(drumkit);

    request.onsuccess = resolve;
    request.onerror = () => reject(Error(`${request.error.name} while adding ${drumkit.sound} from ${drumkit.drumkit}: ${request.error.message}`));
  })
);

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
    .transaction(['drumkit'], 'readonly')
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
