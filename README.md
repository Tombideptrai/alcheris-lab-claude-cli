# alcheris-lab-claude-cli

The starter project for the Alcheris Studio lesson **Put a coding agent to work**.

It is a small to-do API (Node.js and Express) with a ticket in `TASK.md` and two test files that fail until the ticket is done. In the lesson you have Claude Code plan the work, build it, and prove it, while you review every step and decide what gets committed.

```bash
git clone --branch lesson-v1 https://github.com/Tombideptrai/alcheris-lab-claude-cli.git .
npm install
npm test
```

You need **Node.js 20+**, **Git**, and **Claude Code** signed in with your own Claude account.

- `src/`: the API
- `test/`: its tests (`node --test`). The tests are the spec: don't change them to make them pass.
- `TASK.md`: the ticket

Saved points for each step are the tags `step-1` to `step-3`. The `main` branch has one finished version.
