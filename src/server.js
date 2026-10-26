const { createApp } = require('./app');

const port = Number(process.env.PORT) || 3000;

createApp().listen(port, () => {
  console.log(`API running at http://localhost:${port}`);
  console.log('Press Ctrl+C to stop it.');
});
