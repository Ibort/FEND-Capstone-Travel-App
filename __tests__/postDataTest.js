import { postD } from '../src/client/js/postData';


test('namecheck call', () => {
  expect(typeof postD).toBe('function');
})
