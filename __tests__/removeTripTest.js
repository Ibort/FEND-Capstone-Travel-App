import { delTrip } from '../src/client/js/removeTrip.js'


test('namecheck call', () => {
  expect(typeof delTrip).toBe('function');
})
