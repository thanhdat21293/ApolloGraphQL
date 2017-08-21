const express = require('express');
const bodyParser = require('body-parser');
/*
Tại sao lại có cú pháp const { graphqlExpress } = require('apollo-server-express'); trả về một đối tượng có nhiều thuộc tính bên trong
trong đó graphqlExpress chỉ là một thuộc tính
*/
const { graphqlExpress } = require('apollo-server-express');
const { graphiqlExpress } = require('graphql-server-express');
const { buildSchema } = require('graphql');
const PORT = 3000;


const app = express();

var myGraphQLSchema = buildSchema(`
  type Query {
    hello: String,
    add (a: Int, b: Int): Int
  }
`);

var root = {
    hello: () => 'Hello world!',
    //ở đây add: (a, b) => { } là không đúng đâu đấy. params là đối tượng chưa tất
    add: (params) => {
        return params.a + params.b;
    }
};

app.use('/graphql', bodyParser.json(), graphqlExpress({schema: myGraphQLSchema, rootValue: root}));

app.use('/graphiql', graphiqlExpress({
    endpointURL: '/graphql',
}));
app.listen(PORT);