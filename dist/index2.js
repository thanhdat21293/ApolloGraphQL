'use strict';

var express = require('express');
var bodyParser = require('body-parser');
/*
Tại sao lại có cú pháp const { graphqlExpress } = require('apollo-server-express'); trả về một đối tượng có nhiều thuộc tính bên trong
trong đó graphqlExpress chỉ là một thuộc tính
*/

var _require = require('apollo-server-express'),
    graphqlExpress = _require.graphqlExpress;

var _require2 = require('graphql-server-express'),
    graphiqlExpress = _require2.graphiqlExpress;
//const { buildSchema } = require('graphql');


var _require3 = require('graphql-tools'),
    makeExecutableSchema = _require3.makeExecutableSchema;

var PORT = 3000;

var app = express();

var _require4 = require('./schema.js'),
    typeDefs = _require4.typeDefs,
    resolvers = _require4.resolvers;

var jsSchema = makeExecutableSchema({
    typeDefs: typeDefs,
    resolvers: resolvers
});

app.use('/graphql', bodyParser.json(), graphqlExpress({ schema: jsSchema }));

app.use('/graphiql', graphiqlExpress({
    endpointURL: '/graphql'
}));
app.listen(PORT);
//# sourceMappingURL=index2.js.map