# Loud Mock

A mock tool that helps you not to forget.

When adding tests to a project you might need to mock a dependency of the object
under test.

However, it's easy to forget to mock a method or a property, when you should
have provided at least a dummy implementation: Either you care about the
return value, in which case you should have provided one, or you care about the
call happening, in which case you should remember to check the call.

## Usage

Whenever you need to construct a mock for an object, just call `loudMock<T>()`.
Optionally, you can pass an object containing initial values.

```js

describe("The OUT", () => {
    it("Depends on some API call but I forgot to mock it", async () => {
        const mockedApi = createMock<SomeApi>()
        const service = new SomeService(mockedApi);

        await service.doWork(); // Oops! We forgot to mock the call.

        // It will throw an exception reminding you that `realCall` hasn't
        // been mocked, helping you find the issue

        expect(mockedApi.realCall).toHaveBeenCalled()
    });

    it("Depends on some API call but I remembered to mock it", async () => {
        const mockedApi = createMock<SomeApi>()
        const service = new SomeService(mockedApi);

        mockedApi.realCall = jest.fn(); // Just add a way to check the mock

        await service.doWork();

        expect(mockedApi.realCall).toHaveBeenCalled()
    });
})
```


### For Nest.js

When creating your Testing Module, add `useMocker`:

```js
const myTestModule = Test.createTestingModule({
    imports: [RealModule],
    controllers: [SomeController],
    providers: [TheService]
})
    .useMocker((injectionToken) =>
        createMock({ name: injectionToken?.toString()})
    )
```

And you'll see exactly what you need to mock.

## Installation

Just add a dependency as you would in your package manager of choice:

```sh
$ npm install -D loud-mock
$ yarn add -D loud-mock
$ pnpm install -D loud-mock
```

## License

LoudMock is licensed under the LGPL v2.1 License.

Don't worry! It doesn't force you to make your project (L)GPL, unless you create
a derivative of this library.

## Author

Guillermo O. «Tordek» Freschi