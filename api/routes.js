const express = require('express');
const router = express.Router();
require('dotenv').config();
const request = require('request');

router.get("/", (req, res) => {
  res.send("hello world");
});


router.route('/search/:query')

  .get(function(req, res) {

    const query = req.params.query;
    
    const options = { 
      uri: `https://api.unsplash.com/search/?photos?page=1&query=${query}` , 
      headers: { 
        'Authorization': `Client-ID ${process.env.SPLASH_KEY}`, 
      },
      method: 'GET'
    };

    request.get(options, function(err, resp, body) {
      
      const imageLinks = JSON.parse(body).photos.results.map(el => el.links.html);
      console.log(imageLinks)

      res.json(imageLinks)
      res.end()
    })
    
  });

module.exports = router;