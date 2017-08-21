'use strict';

var typeDefs = '\n  type Author {\n    id: Int!\n    firstName: String\n    lastName: String\n    posts: [Post] # the list of Posts by this author\n  }\n  type Post {\n    id: Int!\n    title: String\n    author: Author\n    votes: Int\n  }\n  # the schema allows the following query:\n  type Query {\n    posts: [Post]\n    author(id: Int!): Author\n  }\n  # this schema allows the following mutation:\n  type Mutation {\n    upvotePost (\n      postId: Int!\n    ): Post\n  }\n';

// example data
var authors = [{ id: 1, firstName: 'Tom', lastName: 'Coleman' }, { id: 2, firstName: 'Sashko', lastName: 'Stubailo' }, { id: 3, firstName: 'Mikhail', lastName: 'Novikov' }];
var _posts = [{ id: 1, authorId: 1, title: 'Introduction to GraphQL', votes: 2 }, { id: 2, authorId: 2, title: 'Welcome to Meteor', votes: 3 }, { id: 3, authorId: 2, title: 'Advanced GraphQL', votes: 1 }, { id: 4, authorId: 3, title: 'Launchpad is Cool', votes: 7 }];
var lodash = require('lodash');

var resolvers = {
    Query: {
        posts: function posts() {
            return _posts;
        },
        author: function author(abc, _ref) {
            var id = _ref.id;

            console.log(abc);
            return lodash.find(authors, { id: id });
        }
    },

    Mutation: {
        upvotePost: function upvotePost(_, _ref2) {
            var postId = _ref2.postId;

            var post = lodash.find(_posts, { id: postId });
            if (!post) {
                throw new Error('Couldn\'t find post with id ' + postId);
            }
            post.votes += 1;
            return post;
        }
    },
    Author: {
        posts: function posts(author) {
            return lodash.filter(_posts, { authorId: author.id });
        }
    },

    Post: {
        author: function author(post) {
            return lodash.find(authors, { id: post.authorId });
        }
    }

};

module.exports = {
    typeDefs: typeDefs,
    resolvers: resolvers
};
//# sourceMappingURL=schema.js.map