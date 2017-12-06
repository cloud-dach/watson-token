"use strict";

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const WatsonAuth = require('watson-developer-cloud/authorization/v1');

// Variables REST related
//var http = require("http");
var https = require('https');
var cors = require('cors');
var request = require('request');

// Others
var token_to_use='';
var token_use_auth='X-Watson-Authorization-Token';
var auth_url = 'https://gateway.watsonplatform.net/authorization/api/v1/token';
var wcs_base_url = 'https://gateway.watsonplatform.net/conversation/api';
var wcs_action_url = '/conversation/api/v1/workspaces';
var wcs_version_date = '?version=2017-05-26';
var theMethode = 'GET';
var theHost = 'gateway.watsonplatform.net';
var theProtocoll='https://';
var thePath = wcs_action_url + wcs_version_date;
// Build Path for Watson Conversation REST command
var thePath_URL = theProtocoll + theHost + wcs_action_url + wcs_version_date;
var thePort = 8080;



// when running in bluemix, automatically redirect http to https
if (process.env.VCAP_APPLICATION) {
  app.use(require('express-secure-only')());
}

app.use(cors());
app.use(express.static('./public'));
// post so that credentials don't get stored in logs
app.use(bodyParser.urlencoded({extended: false}));
app.post('/api/token', (req, res) => {

  res.type('text/plain');
  if (!req.body.username || !req.body.password || !req.body.url) {
    return res.status(400).send('Error: username, password, and url are required');
  }

  new WatsonAuth({
    username: req.body.username,
    password: req.body.password,
    url: req.body.url
  }).getToken((err, token) => {
    if (err) {
      console.error(err);
      return res.status(500).send(err.message || err);
    }
    // note: tokens are percent-encoded already and must not be double-encoded
    // Store the token in a globle varibale for reuse in /api/usetoken
    token_to_use = token;
    res.send(token);
    });
});

// Information Sources:
// ====================
// https://watson-api-explorer.mybluemix.net/apis/conversation-v1
// https://www.ibm.com/watson/developercloud/conversation/api/v1/?curl#workspaces
// Sample Conversation Post: https://gateway.watsonplatform.net/conversation/api/v1/workspaces?version=2017-05-26

// This function is a sample how to use the Watson REST API and the Token in javascript.
app.get('/api/usetoken', (req, res) => {

  var options = {
    url: thePath_URL,
    headers: { 'X-Watson-Authorization-Token' : token_to_use,
               'Content-Type'  : 'application/json'
             }
  };

  function callback(error, response, body) {
    if (!error && response.statusCode == 200) {
      var info = JSON.parse(body);
      console.log(info);
      res.json(body);
    } else {
      console.log(error);
      res.send(error);
    }
  }
  request(options, callback);
});

// This function is a sample how to use the REST API javascript.
app.get('/api/country', (req, res) => {

  console.log("**** Test REST CALL - GET Country *****");
  request.get({ url: "http://restcountries.eu/rest/v1/name/Germany"},
                function(error, response, body) {
                  if (!error && response.statusCode == 200) {
                  res.json(body);
                }});
});

const port = process.env.PORT || 8080;

app.listen(port, function() {
  console.log('Watson Token Generator listening on http://localhost:%s/', port);
});
