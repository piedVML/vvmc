const express = require('express');
const app = express();
const graphqlHTTP = require('express-graphql');
const bodyParser = require('body-parser');


const schema = require('./server/src/schema');


app.use('/graphql', graphqlHTTP({
  schema: schema.schema,
  graphiql: true,
}));

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

