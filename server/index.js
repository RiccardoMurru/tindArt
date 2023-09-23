const express = require('express');
const cors = require('cors');
const router = require('./router');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(router)

app.get('*', (req, res) => {
  res.status(404).send('Not Found');
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