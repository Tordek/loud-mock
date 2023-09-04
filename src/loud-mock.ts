export interface LoudMockOptions<T> {
  name?: string;
  partial?: Partial<T>;
}
export const createMock = <T extends object>(
  { name, partial }: LoudMockOptions<T> = {
    name: "LoudMock",
  }
): T => {
  const proxy = new Proxy(partial ?? ({} as Partial<T>), {
    get: (obj, prop) => {
      if (Reflect.has(obj, prop)) {
        return Reflect.get(obj, prop);
      }

      if (prop === "then") return undefined;

      throw new Error(`Missing mock for ${name}.${prop.toString()}`);
    },
  });

  return proxy as T;
};
