/* eslint-disable no-console */
const express = require('express');
// const path = require('path');
const cors = require('cors');
require('dotenv').config();
const db = require('./db/database');
const router = require('./routes');

const app = express();

// ----- Middleware ----- //
// app.use(express.static(path.join(__dirname, '../public')));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ----- Request handling ----- //
app.use(router);

const PORT = 3001;

db.connect()
  .then(() => {
    console.log('database connected');
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  })
  .catch((err) => console.log(err));

module.exports = app;
