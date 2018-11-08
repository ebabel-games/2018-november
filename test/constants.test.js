'use strict';

const C = require('../src/constants');

test('debounceDelay has the correct value', () => {
  expect(C.debounceDelay).toBe(250);
});
