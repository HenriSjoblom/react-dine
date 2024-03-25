const express = require('express');
const cors = require('cors');

const dinesRouter = require('./routes/dines');
const usersRouter = require('./routes/users');

const app = express();

app.use(express.json());
app.use(express.static('public'));

app.get('/health', (req, res) => {
    res.send("OK");
  });

app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://172.16.6.90'
  ]
}));

app.use('/api/users', usersRouter);
app.use('/api/dines', dinesRouter);

module.exports = app;
