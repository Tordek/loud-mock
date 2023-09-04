export const createMock = <T extends object>(partial: Partial<T> = {}): T => {
  const proxy = new Proxy(partial, {
    get: (obj, prop) => {
      if (Reflect.has(obj, prop)) {
        return Reflect.get(obj, prop);
      }

      throw new Error(`Missing mock for ${prop.toString()}`);
    },
  });

  return proxy as T;
};
