// run using command: InstantSurvey\server\node_modules\.bin\babel-node app.js
import express from 'express';
import * as _ from 'lodash';

const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync')
const bodyParser = require('body-parser');  
const shortid = require('shortid')

// Set up the express app
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const cors = require('cors');
const adapter = new FileSync('./db/db.json');
const dbFile = low(adapter);
dbFile.defaults({ survey: [], surveyStats: [], surveyLinks: []})
  .write();

// Add a post


// get all todos

app.get('*', cors());
app.get('/api/v1/survey', (req, res) => {
  const surveyList = dbFile.get('survey');
  res.status(200).send({
    success: 'true',
    message: 'surveys retrieved successfully',
    surveyList: surveyList
  })
});

app.get('*', cors());
app.get('/api/v1/survey/:id', (req, res) => {
  const surveyObj = dbFile.get('survey')
      .find({id: req.params.id});
  res.status(200).send({
    success: 'true',
    message: 'surveys retrieved successfully',
    survey: surveyObj
  })
});

app.get('*', cors());
app.get('/api/v1/surveyLink/:id', (req, res) => {
  const surveyLinkObj = dbFile.get('surveyLinks')
      .find({id: req.params.id});
  res.status(200).send({
    success: 'true',
    message: 'survey link retrieved successfully',
    surveyLink: surveyLinkObj
  })
});

app.options('*', cors());
app.post('/api/v1/survey', (req, res) => {
  console.log(req.body);
  console.log(req.body.surveyName);
  if(!req.body.surveyName) {
    return res.status(400).send({
      success: 'false',
      message: 'Survey name is required'
    });
  } else if(!req.body.surveyBody) {
    return res.status(400).send({
      success: 'false',
      message: 'Survey data missing'
    });
  }

  const surveyIdentifier = shortid.generate();
  dbFile.get('survey')
	.push({ id: surveyIdentifier, surveyName: req.body.surveyName, surveyBody: req.body.surveyBody})
	.write();
 // db.push(todo);
 const responseObj = {
   success: 'true',
   message: 'survey added successfully',
   surveyId: surveyIdentifier
 };
 return res.status(201).send(JSON.stringify(responseObj));
});

app.post('/api/v1/survey/consume', (req, res) => {
  if(!req.body.surveyLinkId) {
    return res.status(400).send({
      success: 'false',
      message: 'Survey link id is required'
    });
  } else if(!req.body.surveyStat) {
    return res.status(400).send({
      success: 'false',
      message: 'Survey data required'
    });
  } else if (!dbFile.get('surveyLinks')
          .find({ id: req.body.surveyLinkId})
          .value()
          .isValid) {
    return res.status(400).send({
      success: 'false',
      message: 'Survey link is already consumed'
    });
  }

  dbFile.get('surveyLinks')
      .find({ id: req.body.surveyLinkId})
      .assign({ isValid: false})
      .write();

  const surveyIdentifier = dbFile.get('surveyLinks')
      .find({ id: req.body.surveyLinkId})
      .value()
      .surveyId;
  dbFile.get('surveyStats')
      .push({surveyId: surveyIdentifier, surveyStat: req.body.surveyStat})
      .write();
  const responseObj = {
    success: 'true',
    message: 'survey link is now disabled'
  };
  return res.status(200).send(JSON.stringify(responseObj));
});

app.post('/api/v1/surveyLink', (req, res) => {
  if(!req.body.surveyId) {
    return res.status(400).send({
      success: 'false',
      message: 'Survey id is required'
    });
  }

  const surveyLinkIdentifier = shortid.generate();
  dbFile.get('surveyLinks')
      .push({ id: surveyLinkIdentifier, surveyId: req.body.surveyId, isValid: true})
      .write();
  console.log(req.body);
  const responseObj = {
    success: 'true',
    message: 'survey link added successfully',
    surveyLink: surveyLinkIdentifier
  };
  return res.status(201).send(JSON.stringify(responseObj));
});

const PORT = 5000;

app.listen(PORT, '0.0.0.0', () => {
  console.log('server running on port: ' + PORT);
});

