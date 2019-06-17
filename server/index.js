const express = require('express');
const { LocalStorage } = require('node-localstorage');

const router = require('./router');

localStorage = new LocalStorage('./data');
localStorage.setItem('appData', JSON.stringify({ user: {}, tokens: {} }));

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(router);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
