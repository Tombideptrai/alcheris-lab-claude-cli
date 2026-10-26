# CLAUDE.md

A small to-do API in Node.js and Express, used to practise working with a coding agent.

## Commands

- `npm install`: install dependencies
- `npm start`: run the API on http://localhost:3000 (`PORT` overrides it)
- `npm test`: run every test (`node --test`)
- `node --test test/<file>.test.js`: run one test file

## Layout

- `src/app.js`: `createApp()` builds the Express app and every route. To-dos live in memory in that function.
- `src/server.js`: starts the app on a port.
- `test/`: one file per behaviour. `test-support/start-api.js` starts a fresh app per test.
- `TASK.md`: the current ticket.

## Rules

- The tests are the spec. Never edit a test to make it pass; change the code.
- No new dependencies without asking.
- Errors answer JSON: `{ "error": "..." }` with the right status code.
- Keep changes small and run `npm test` before saying something is done.
