const test = require('node:test');
const assert = require('node:assert/strict');
const { startApi } = require('../test-support/start-api');

async function create(api, title) {
  const response = await fetch(`${api}/todos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title }),
  });
  return response.json();
}

test('DELETE /todos/:id removes the to-do', async t => {
  const api = await startApi(t);
  const milk = await create(api, 'Buy milk');
  const bread = await create(api, 'Buy bread');

  const response = await fetch(`${api}/todos/${milk.id}`, { method: 'DELETE' });
  assert.equal(response.status, 204, 'Deleting a to-do should answer 204 No Content');
  assert.equal(await response.text(), '', 'A 204 answer has no body');

  const list = await (await fetch(`${api}/todos`)).json();
  assert.deepEqual(list, [bread], 'Only the deleted to-do should be gone');
});

test('DELETE /todos/:id answers 404 for a to-do that does not exist', async t => {
  const api = await startApi(t);
  const response = await fetch(`${api}/todos/999`, { method: 'DELETE' });
  assert.equal(response.status, 404, 'An unknown id should answer 404 Not Found');
  assert.equal(typeof (await response.json()).error, 'string', '404s should explain what went wrong in an "error" field');
});

test('ids are never reused after a delete', async t => {
  const api = await startApi(t);
  const first = await create(api, 'Buy milk');
  const second = await create(api, 'Buy bread');
  await fetch(`${api}/todos/${first.id}`, { method: 'DELETE' });

  const third = await create(api, 'Buy eggs');
  assert.notEqual(third.id, second.id, 'A new to-do must not get the id of one that still exists');

  const ids = (await (await fetch(`${api}/todos`)).json()).map(todo => todo.id);
  assert.equal(new Set(ids).size, ids.length, 'Every to-do in the list needs its own id');
});
