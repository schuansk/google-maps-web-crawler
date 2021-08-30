require('dotenv').config();
const cors = require('cors');
const express = require("express");
const routes = require('./routes');
require('../infra/database');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/', routes);

app.listen(3333, () => console.log('API is alive on port 3333!'));
