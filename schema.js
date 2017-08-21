const typeDefs = `
  type Author {
    id: Int!
    firstName: String
    lastName: String
    posts: [Post] # the list of Posts by this author
  }
  type Post {
    id: Int!
    title: String
    author: Author
    votes: Int
  }
  # the schema allows the following query:
  type Query {
    posts: [Post]
    author(id: Int!): Author
    postById(id: Int!): Post
    postsByText(title: String!): [Post]
  }
  # this schema allows the following mutation:
  type Mutation {
    upvotePost (
      postId: Int!
    ): Post
  }
`;


// example data
const authors = [
    {id: 1, firstName: 'Tom', lastName: 'Coleman'},
    {id: 2, firstName: 'Sashko', lastName: 'Stubailo'},
    {id: 3, firstName: 'Mikhail', lastName: 'Novikov'},
];
const posts = [
    {id: 1, authorId: 1, title: 'Introduction to GraphQL', votes: 2},
    {id: 2, authorId: 2, title: 'Welcome to Meteor', votes: 3},
    {id: 3, authorId: 2, title: 'Advanced GraphQL', votes: 1},
    {id: 4, authorId: 3, title: 'Launchpad is Cool', votes: 7},
];
const lodash = require('lodash');

const resolvers = {
        Query: {
            posts: () => posts,
            author: (abc, {id}) => {
                console.log(abc);
                return lodash.find(authors, {id: id});
            },
            postById: (_, {id}) => lodash.find(posts, {id: id}),
            postsByText: (_, {title}) => {
                let arr = []
                posts.map(item => {
                    if(item.title.indexOf(title) >= 0) {
                        arr.push(item)
                    }
                });
                return arr;
            }
        },

        Mutation: {
            upvotePost: (_, {postId}) => {
                const post = lodash.find(posts, {id: postId});
                if (!post) {
                    throw new Error(`Couldn't find post with id ${postId}`);
                }
                post.votes += 1;
                return post;
            },
        },
        Author: {
            posts: (author) => lodash.filter(posts, {authorId: author.id}),
        }
        ,
        Post: {
            author: (post) => lodash.find(authors, {id: post.authorId}),
        }
        ,
    }
;

module.exports = {
    typeDefs: typeDefs,
    resolvers: resolvers
};