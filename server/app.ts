// run using command: InstantSurvey\server\node_modules\.bin\babel-node app.js
import express from 'express';

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
dbFile.defaults({ survey: [], surveyStats: []})
  .write();

// Add a post


// get all todos
app.get('/api/v1/todos', (req, res) => {
  res.status(200).send({
    success: 'true',
    message: 'todos retrieved successfully',
    todos: 'TBD'
  })
});

app.get('/api/v1/survey', (req, res) => {
  const surveyList = dbFile.get('posts');
  res.status(200).send({
    success: 'true',
    message: 'surveys retrieved successfully',
    todos: surveyList
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

  dbFile.get('survey')
	.push({ id: shortid.generate(), surveyName: req.body.surveyName, surveyBody: req.body.surveyBody})
	.write();
 // db.push(todo);
 console.log(req.body);
 const responseObj = {
   success: 'true',
   message: 'todo added successfully',
   req1: req.body
 };
 return res.status(201).send(JSON.stringify(responseObj));
});

const PORT = 5000;

app.listen(PORT, '0.0.0.0', () => {
  console.log('server running on port: ' + PORT);
});

