/* eslint-disable func-names */
/* eslint-disable prettier/prettier */
import express from 'express';
import bodyParser from 'body-parser';

const port = 3001;

const app = express();

// configure app to use bodyParser()
const urlencodedParser = bodyParser.urlencoded({ extended: true });
const jsonParser = bodyParser.json();

// get an instance of the express Router
const routerV1 = express.Router();

routerV1.get('/', function(req, res) {
  res.json({ message: 'this is an API response!!!' });
});

// api context: /api/v1
app.use('/api/v1', routerV1); // you can access through http://localhost:3001/api/v1

// start the server
app.listen(port);
console.log(`Server running on port ${port}`);
