const test = require('node:test');
const assert = require('node:assert/strict');
const { startApi } = require('../test-support/start-api');

const json = (method, body) => ({
  method,
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(body),
});

async function create(api, title) {
  return (await fetch(`${api}/todos`, json('POST', { title }))).json();
}

test('PATCH /todos/:id marks a to-do done and not done', async t => {
  const api = await startApi(t);
  const todo = await create(api, 'Buy milk');

  const done = await fetch(`${api}/todos/${todo.id}`, json('PATCH', { done: true }));
  assert.equal(done.status, 200, 'Updating a to-do should answer 200 OK');
  assert.deepEqual(await done.json(), { ...todo, done: true }, 'The answer should be the updated to-do');

  const undone = await fetch(`${api}/todos/${todo.id}`, json('PATCH', { done: false }));
  assert.equal((await undone.json()).done, false, 'done: false should mark it not done again');

  const list = await (await fetch(`${api}/todos`)).json();
  assert.deepEqual(list, [{ ...todo, done: false }], 'GET /todos should show the change');
});

test('PATCH /todos/:id refuses a done that is not true or false', async t => {
  const api = await startApi(t);
  const todo = await create(api, 'Buy milk');
  for (const body of [{}, { done: 'yes' }, { done: 1 }, { done: null }]) {
    const response = await fetch(`${api}/todos/${todo.id}`, json('PATCH', body));
    assert.equal(response.status, 400, `${JSON.stringify(body)} should be refused with 400 Bad Request`);
    assert.equal(typeof (await response.json()).error, 'string', 'Refusals should explain what went wrong in an "error" field');
  }
  const list = await (await fetch(`${api}/todos`)).json();
  assert.deepEqual(list, [todo], 'Refused updates must not change the to-do');
});

test('PATCH /todos/:id answers 404 for a to-do that does not exist', async t => {
  const api = await startApi(t);
  const response = await fetch(`${api}/todos/999`, json('PATCH', { done: true }));
  assert.equal(response.status, 404, 'An unknown id should answer 404 Not Found');
  assert.equal(typeof (await response.json()).error, 'string', '404s should explain what went wrong in an "error" field');
});
