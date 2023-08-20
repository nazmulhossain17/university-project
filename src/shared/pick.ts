const pick = <T extends Record<string, unknown>, K extends keyof T>(
  obj: T,
  keys: K[],
): Partial<T> => {
  const finalObj: Partial<T> = {};

  for (const key of keys) {
    if (obj && Object.prototype.hasOwnProperty.call(obj, key)) {
      finalObj[key] = obj[key];
    }
  }

  return finalObj;
};

export default pick;
