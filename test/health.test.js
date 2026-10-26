const test = require('node:test');
const assert = require('node:assert/strict');
const { startApi } = require('../test-support/start-api');

test('GET /health says the API is up', async t => {
  const api = await startApi(t);
  const response = await fetch(`${api}/health`);
  assert.equal(response.status, 200, 'GET /health should answer 200 OK');
  assert.deepEqual(await response.json(), { status: 'ok' });
});
