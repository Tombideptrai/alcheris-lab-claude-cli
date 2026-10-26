const test = require('node:test');
const assert = require('node:assert/strict');
const { startApi } = require('../test-support/start-api');

const post = (api, body) => fetch(`${api}/todos`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(body),
});

test('POST /todos creates a to-do', async t => {
  const api = await startApi(t);
  const response = await post(api, { title: 'Buy milk' });
  assert.equal(response.status, 201, 'Creating a to-do should answer 201 Created');
  const todo = await response.json();
  assert.equal(todo.title, 'Buy milk');
  assert.equal(todo.done, false, 'A new to-do is not done yet');
  assert.ok(todo.id !== undefined, 'A new to-do needs an id');

  const list = await (await fetch(`${api}/todos`)).json();
  assert.deepEqual(list, [todo], 'GET /todos should now include the new to-do');
});

test('POST /todos refuses a to-do without a title', async t => {
  const api = await startApi(t);
  for (const body of [{}, { title: '' }, { title: '   ' }, { title: 42 }]) {
    const response = await post(api, body);
    assert.equal(response.status, 400, `${JSON.stringify(body)} should be refused with 400 Bad Request`);
    const error = await response.json();
    assert.equal(typeof error.error, 'string', 'Refusals should explain what went wrong in an "error" field');
  }
  const list = await (await fetch(`${api}/todos`)).json();
  assert.equal(list.length, 0, 'Refused to-dos must not be saved');
});
