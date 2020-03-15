import Pomidorek from './pomidorek.js'

beforeAll(() => {
  jest.useFakeTimers()
});

beforeEach(() => jest.resetModules());

test('Test if tests are working', () => {
  expect(true).toEqual(true)
})

test('Pomidorek starts out paused by default', () => {
  expect(Pomidorek.isPaused()).toEqual(true)
})

test('Pulse callback is not called before Pomidorek.start() is invoked', () => {
  const callback = jest.fn()

  Pomidorek.setPulseCallback(callback)

  jest.runOnlyPendingTimers();

  expect(callback).not.toBeCalled();

})

test('Pulse callback is called after Pomidorek.start() is invoked', () => {
  jest.useFakeTimers()
  const callback = jest.fn()

  Pomidorek.start() 
  Pomidorek.setPulseCallback(callback)

  expect(callback).not.toBeCalled();

  jest.runOnlyPendingTimers()

  expect(callback).toBeCalled()
})

test('Pulse callback is called after 2 times per second', () => {
  jest.useFakeTimers()
  const callback = jest.fn()

  Pomidorek.start() 
  Pomidorek.setPulseCallback(callback)

  expect(callback).not.toBeCalled()

  jest.advanceTimersByTime(1000)

  expect(callback).toBeCalled()
  expect(callback).toHaveBeenCalledTimes(2);
})

