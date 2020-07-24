const express = require("express");
const graphqlHTTP = require("express-graphql").graphqlHTTP;
const cors = require("cors");

const mongoose = require('./dbconnect/mongoose');
// const userSchema = require('./graphql/index').userSchema;
const songSchema = require('./graphql/index').songSchema;

const app = express();
const db = mongoose();

app.use('*', cors());
app.use('/graphql', cors(), graphqlHTTP({
  schema: songSchema,
  rootValue: global,
  graphiql: true
}));

// Up and Running at Port 3000
app.listen(process.env.PORT || 3000, () => {
  console.log('A GraphQL API server running at port 3000');
});