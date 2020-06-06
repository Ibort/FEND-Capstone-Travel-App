import { addNewTrip } from '../src/client/js/addTrip';


test('namecheck call', () => {
  expect(typeof addNewTrip).toBe('function');
})
