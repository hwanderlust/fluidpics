const express = require('express');
const app = express();
const PORT = 3000;
const routes = require('./routes');
const morgan = require("morgan");

app.use(morgan("short"));
app.use(express.urlencoded())
app.use('/', routes);

app.listen(PORT, () => {
  console.log(`app is up and running captain!`)
})

// app.use(bodyParser.urlencoded({ extended: false }));
// const bodyParser = require('body-parser');