const express = require("express");
const graphqlHTTP = require("express-graphql").graphqlHTTP;
const cors = require("cors");

const mongoose = require('./dbconnect/mongoose');
const schema = require('./graphql/index').schema;

const app = express();
mongoose();

app.use('*', cors());
app.use('/graphql', cors(), graphqlHTTP({
  schema: schema,
  rootValue: global,
  graphiql: true
}));

// Up and Running at Port 3000
app.listen(process.env.PORT || 3000, () => {
  console.log('A GraphQL API server running at port 3000');
});