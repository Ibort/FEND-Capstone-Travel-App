import { updUi } from '../src/client/js/updateUi.js';


test('namecheck call', () => {
  expect(typeof updUi).toBe('function');
})
