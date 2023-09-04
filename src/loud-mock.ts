export interface MockOptions {
  name?: string;
}

export const createMock = <T extends object>(partial: T): T => {
  const proxy = new Proxy(partial, {
    get: (obj, prop) => {
      if (Reflect.has(obj, prop)) {
        return Reflect.get(obj, prop);
      }

      throw new Error(`Missing mock for ${prop.toString()}`);
    },
  });

  return proxy;
};
