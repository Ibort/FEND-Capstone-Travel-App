import { addInfo } from '../src/client/js/addTripInfo.js'


test('namecheck call', () => {
  expect(typeof addInfo).toBe('function');
})
