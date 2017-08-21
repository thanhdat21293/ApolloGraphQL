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

var _require3 = require('graphql'),
    buildSchema = _require3.buildSchema;

var PORT = 3000;

var app = express();

var myGraphQLSchema = buildSchema('\n  type Query {\n    hello: String,\n    add (a: Int, b: Int): Int\n  }\n');

var root = {
    hello: function hello() {
        return 'Hello world!';
    },
    //ở đây add: (a, b) => { } là không đúng đâu đấy. params là đối tượng chưa tất
    add: function add(params) {
        return params.a + params.b;
    }
};

app.use('/graphql', bodyParser.json(), graphqlExpress({ schema: myGraphQLSchema, rootValue: root }));

app.use('/graphiql', graphiqlExpress({
    endpointURL: '/graphql'
}));
app.listen(PORT);
//# sourceMappingURL=index.js.map