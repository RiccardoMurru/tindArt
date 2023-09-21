const express = require('express');
const cors = require('cors');
const router = require('./router');

const app = express();
const port = 3000;


app.get('/', (req, res) => {
  res.send('Hello World!');
});

(async () => {
  try {
    app.listen(port, () => {
      console.log(`App listening on port ${port}`);
    });
  } catch (e) {
    console.log(e);
  }
})();