const express = require('express');
const bodyParser = require('body-parser');
/*
Tại sao lại có cú pháp const { graphqlExpress } = require('apollo-server-express'); trả về một đối tượng có nhiều thuộc tính bên trong
trong đó graphqlExpress chỉ là một thuộc tính
*/
const { graphqlExpress } = require('apollo-server-express');
const { graphiqlExpress } = require('graphql-server-express');
//const { buildSchema } = require('graphql');
const {makeExecutableSchema}  = require('graphql-tools');

const PORT = 3000;


const app = express();
const {typeDefs, resolvers} = require('./schema.js');

const jsSchema = makeExecutableSchema({
    typeDefs,
    resolvers
});


app.use('/graphql', bodyParser.json(), graphqlExpress({schema: jsSchema}));

app.use('/graphiql', graphiqlExpress({
    endpointURL: '/graphql',
}));
app.listen(PORT);