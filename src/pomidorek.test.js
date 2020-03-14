import Pomidorek from './pomidorek.js'

test('Test if tests are working', () => {
  expect(true).toEqual(true)
})

test('Pomidorek starts out paused by default', () => {
  expect(Pomidorek.isPaused()).toEqual(true)
})
