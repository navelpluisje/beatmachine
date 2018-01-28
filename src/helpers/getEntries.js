// @flow

export function getEntries<T>(obj: { [string]: T }): Array<[string, T]> {
  const keys : string[] = Object.keys(obj);
  return keys.map(key => [key, obj[key]]);
}

export default null;

