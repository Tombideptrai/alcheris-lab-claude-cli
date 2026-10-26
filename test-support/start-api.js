const { createApp } = require('../src/app');

// Starts a fresh copy of the API on a free port and returns its address.
async function startApi(t) {
  const server = createApp().listen(0);
  await new Promise(resolve => server.once('listening', resolve));
  t.after(() => server.close());
  return `http://127.0.0.1:${server.address().port}`;
}

module.exports = { startApi };
