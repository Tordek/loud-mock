import { createMock } from "./loud-mock.js";

describe("loud-mock", () => {
  it("exists", () => {
    expect(createMock).toBeDefined();
  });

  it("can be instantiated", () => {
    expect(createMock({})).toBeDefined();
  });

  it("throws when accessing unmocked prop", () => {
    const mock = createMock<{ abc: number }>({});
    expect(() => mock.abc).toThrow();
  });

  it("allows methods to be mocked", () => {
    const mock = createMock<{ mockedMethod: () => number }>();
    mock.mockedMethod = jest.fn();

    mock.mockedMethod();

    expect(mock.mockedMethod).toHaveBeenCalledTimes(1);
  });

  it("allows passing an object with predefined props", () => {
    const mock = createMock({
      preDefined: 5,
    });

    expect(mock.preDefined).toEqual(5);
  });

  it("allows overriding a property by setting it directly", () => {
    const mock = createMock<{ overriden: number }>();

    mock.overriden = 6;

    expect(mock.overriden).toEqual(6);
  });
});
