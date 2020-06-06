import { genFrom } from '../src/client/js/generateFrom';


test('namecheck call', () => {
  expect(typeof genFrom).toBe('function');
})
