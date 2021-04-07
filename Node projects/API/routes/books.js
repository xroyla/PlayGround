var express = require('express');
var router = express.Router();

router.route('/')
  .get((req, res) => {
    const sql = require("mssql");

    // config for your database
    const config = {
      user: 'roytest',
      password: '1234',
      server: 'localhost',
      database: 'RoyTest'
    };

    // connect to your database
    sql.connect(config, function (err) {
    
      if (err) {
        console.log(err);
        return res.send(err);
      }

      // create Request object
      const request = new sql.Request();
         
      // query to the database and get the records
      request.query('select * from Books', function (err, recordset) {
          
          if (err) console.log(err)

          // send records as a response
          res.send(recordset);
          
      });
    });

    // res.json(response);
  });
  
router.route('/httpGet')
  .get((req, res) => {
    const https = require('https');

    https.get('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY', (resp) => {
      let data = '';

      // A chunk of data has been received.
      resp.on('data', (chunk) => {
        data += chunk;
      });

      // The whole response has been received. Print out the result.
      resp.on('end', () => {
        console.log(JSON.parse(data));
        res.json(JSON.parse(data));
      });

    }).on("error", (err) => {
      console.log("Error: " + err.message);
    });
  });

router.route('/requestGet')
  .get((req, res) => {
    const request = require('request');

    request('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY', { json: true }, (err, nasares, body) => {
      if (err) { return console.log(err); }
      console.log(body.url);
      console.log(body.explanation);
      res.json(body);
    });
  });

module.exports = router;