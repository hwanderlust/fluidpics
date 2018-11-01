const express = require('express');
const app = express();
const PORT = 3000;
const routes = require('./routes');
const morgan = require("morgan");
const cors = require('cors');

// const whitelist = ["http://localhost:3000/"];
// const corsOptions = {
//   origin: function(origin, callback) {
//     if(whitelist.indexOf(origin) !== -1) {
//       callback(null, true)
//     } else {
//       callback(new Error('Not allowed by CORS'))
//     }
//   },
//   methods: 'GET'
// };

const corsOptions = {
  origin: '*'
}

app.use(morgan("short"));
app.use(express.urlencoded());
app.use(cors(corsOptions));
app.use('/', routes);

app.listen(PORT, () => {
  console.log(`app is up and running captain!`)
})

// app.use(bodyParser.urlencoded({ extended: false }));
// const bodyParser = require('body-parser');