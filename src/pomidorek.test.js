beforeAll(() => {
  jest.useFakeTimers()
});

beforeEach(() => jest.resetModules());

test('Pomidorek starts out paused by default', () => {
  const pomidorek = require('./pomidorek.js').default
  expect(pomidorek.isPaused()).toEqual(true)
})

test('Pulse callback is not called before pomidorek.start() is invoked', () => {
  const pomidorek = require('./pomidorek.js').default
  const callback = jest.fn()

  pomidorek.setPulseCallback(callback)

  jest.runOnlyPendingTimers();

  expect(callback).not.toBeCalled();

})

test('Pulse callback is called after pomidorek.start() is invoked', () => {
  const pomidorek = require('./pomidorek.js').default
  jest.useFakeTimers()
  const callback = jest.fn()

  pomidorek.start() 
  pomidorek.setPulseCallback(callback)

  expect(callback).not.toBeCalled();

  jest.runOnlyPendingTimers()

  expect(callback).toBeCalled()
})

test('Pulse callback is called after 2 times per second', () => {
  const pomidorek = require('./pomidorek.js').default
  jest.useFakeTimers()
  const callback = jest.fn()

  pomidorek.start() 
  pomidorek.setPulseCallback(callback)

  expect(callback).not.toBeCalled()

  jest.advanceTimersByTime(1000)

  expect(callback).toBeCalled()
  expect(callback).toHaveBeenCalledTimes(2);
})

test('Next activity after a pomodoro is a short break', () => {
  const pomidorek = require('./pomidorek.js').default
  pomidorek.startPomodoro()
  expect(pomidorek.getNextActivity()).toEqual('short break')
})

test('Next activity after a short break is a pomodoro', () => {
  const pomidorek = require('./pomidorek.js').default
  pomidorek.startShortBreak()
  expect(pomidorek.getNextActivity()).toEqual('pomodoro')
})

test('Next activity after a long break is a pomodoro', () => {
  const pomidorek = require('./pomidorek.js').default
  pomidorek.startLongBreak()
  expect(pomidorek.getNextActivity()).toEqual('pomodoro')
})

test('Next activity after four pomodoros without long break is a long break', () => {
  const pomidorek = require('./pomidorek.js').default
  pomidorek.startPomodoro()
  pomidorek.startShortBreak();
  pomidorek.startPomodoro()
  pomidorek.startShortBreak();
  pomidorek.startPomodoro()
  pomidorek.startShortBreak();
  pomidorek.startPomodoro()
  expect(pomidorek.getNextActivity()).toEqual('long break')
})

test('Next activity after 2 without long break pomodoros is a short break', () => {
  const pomidorek = require('./pomidorek.js').default
  pomidorek.startPomodoro()
  pomidorek.startShortBreak();
  pomidorek.startPomodoro()
  pomidorek.startLongBreak();
  pomidorek.startPomodoro()
  pomidorek.startShortBreak();
  pomidorek.startPomodoro()
  expect(pomidorek.getNextActivity()).toEqual('short break')
})

test('Starting next activity during pomodoro triggers short break', () => {
  const pomidorek = require('./pomidorek.js').default
  pomidorek.startPomodoro()
  expect(pomidorek.getCurrentActivity()).toEqual('pomodoro')
  pomidorek.startNextActivity()
  expect(pomidorek.getCurrentActivity()).toEqual('short break')
})

test('Starting next activity short break  triggers pomodoro', () => {
  const pomidorek = require('./pomidorek.js').default
  pomidorek.startShortBreak()
  pomidorek.startNextActivity()
  expect(pomidorek.getCurrentActivity()).toEqual('pomodoro')
})

test('Starting next activity long break  triggers pomodoro', () => {
  const pomidorek = require('./pomidorek.js').default
  pomidorek.startLongBreak()
  pomidorek.startNextActivity()
  expect(pomidorek.getCurrentActivity()).toEqual('pomodoro')
})

test('Starting next activity after 4 pomodoros without long break triggers long break', () => {
  const pomidorek = require('./pomidorek.js').default

  pomidorek.startPomodoro()
  pomidorek.startShortBreak()
  pomidorek.startPomodoro()
  pomidorek.startShortBreak()
  pomidorek.startPomodoro()
  pomidorek.startShortBreak()
  pomidorek.startPomodoro()

  pomidorek.startNextActivity()
  expect(pomidorek.getCurrentActivity()).toEqual('long break')
})

test('Retrieving activity log without any activities performed yields empty array', () => {
  const pomidorek = require('./pomidorek.js').default
  const activityLog = pomidorek.getActivityLog()
  expect(activityLog).toEqual([])
})

test('Activity log keeps activities in order', () => {
  const pomidorek = require('./pomidorek.js').default
  pomidorek.startPomodoro()
  pomidorek.startShortBreak()
  pomidorek.startLongBreak()
  const activities = pomidorek.getActivityLog().map(i => i.activity)
  expect(activities).toEqual(['pomodoro', 'short break', 'long break'])
})

test('', () => {
  
})