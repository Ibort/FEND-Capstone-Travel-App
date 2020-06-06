import { scrollToAdd } from '../src/client/js/scrollToSaveTrip.js';

test('namecheck call', () => {
  expect(typeof scrollToAdd).toBe('function');
})
