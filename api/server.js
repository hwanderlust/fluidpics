const express = require('express');
const app = express();
const PORT = 3000;
const routes = require('./routes');
const morgan = require("morgan");
const bodyParser = require('body-parser');

app.use(morgan("short"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', routes);

app.listen(PORT)
