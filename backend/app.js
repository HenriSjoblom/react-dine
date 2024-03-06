const express = require('express');
const dinesRouter = require('./routes/dines');
const usersRouter = require('./routes/users');

const app = express();

app.use(express.json());


app.get('/health', (req, res) => {
    res.send("OK");
  });

app.use('/api/users', usersRouter);
app.use('/api/dines', dinesRouter);

module.exports = app;
