const express = require('express');

const app = express();
// const bookRouter = express.Router();
const port = process.env.PORT || 3000;

const bookRouter = require('./routes/books');

app.use('/books', bookRouter);

app.get('/', (req, res) => {
  res.send('Welcome to my Nodemon api!');
});

app.listen(port, () => {
  console.log(`running on port ${port}`);
});

