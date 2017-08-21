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

app.use(bodyParser.json()); // get information from html forms
app.use(bodyParser.urlencoded({extended: true}));

var myGraphQLSchema = buildSchema(`
  type Query {
    hello: String,
    add (a: Int, b: Int): Int,
    minus (a: Int, b: Int): Int
  }
`);

var root = {
    hello: () => 'Hello world!',
    //ở đây add: (a, b) => { } là không đúng đâu đấy. params là đối tượng chưa tất
    add: (params) => {
        return params.a + params.b;
    },
    minus: (params) => {
        return params.a - params.b;
    }
};

app.use('/graphql', bodyParser.json(),  graphqlExpress({schema: myGraphQLSchema, rootValue: root}));

app.use('/graphiql',graphiqlExpress({
    endpointURL: '/graphql',
}));


app.get('/hello1', graphqlExpress({schema: myGraphQLSchema, rootValue: root}));
app.post('/add1', graphqlExpress({schema: myGraphQLSchema, rootValue: root}));





app.get('/hello', (req, res) => {
    res.json({hello: root.hello()});
});

app.post('/add', (req, res) => {
    res.json({add: root.add({a: parseInt(req.body.a), b: parseInt(req.body.b)})})
})



















app.listen(PORT);