const express = require('express');
const dinesRouter = require('./routes/dines');

const app = express();

app.use(express.json());
app.use('/api/dines', dinesRouter);

app.get('/health', (req, res) => {
    res.send("OK");
  });

module.exports = app;
