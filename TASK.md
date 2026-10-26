# Ticket: finish and delete to-dos

Right now a to-do can be created and listed, but never marked done or removed. Add both.

## Mark a to-do done (or not done)

`PATCH /todos/:id` with a JSON body like `{ "done": true }`.

- Answers **200** with the updated to-do.
- `done` must be `true` or `false`. Anything else (missing, `"yes"`, `1`) answers **400** with `{ "error": "..." }` and changes nothing.
- An id that doesn't exist answers **404** with `{ "error": "..." }`.

## Delete a to-do

`DELETE /todos/:id`

- Answers **204** with no body, and the to-do is gone from `GET /todos`.
- An id that doesn't exist answers **404** with `{ "error": "..." }`.

## Done means

- `test/todos-update.test.js` and `test/todos-delete.test.js` pass.
- Every test that passed before still passes.
- The tests are not changed. They are the spec.
- No new dependencies. Express already does everything this needs.
