const test = require('node:test');
const assert = require('node:assert/strict');
const { startApi } = require('../test-support/start-api');

test('GET /todos returns the to-do list as JSON', async t => {
  const api = await startApi(t);
  const response = await fetch(`${api}/todos`);
  assert.equal(response.status, 200, 'GET /todos should answer 200 OK');
  const body = await response.json();
  assert.ok(Array.isArray(body), 'GET /todos should send back an array');
  assert.equal(body.length, 0, 'A fresh API starts with no to-dos');
});
