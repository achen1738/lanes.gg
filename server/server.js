/* eslint-disable func-names */
/* eslint-disable prettier/prettier */
const summonerRouter = require('./summoner/summonerAPI.js');
const matchRouter = require('./match/matchAPI.js');
const gameRouter = require('./game/gameAPI.js');
const userRouter = require('./user/userAPI.js');

const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull
} = require('graphql');

const port = 5000;
const app = express();

const authors = [
  { id: 1, name: 'J. K. Rowling' },
  { id: 2, name: 'J. R. R. Tolkien' },
  { id: 3, name: 'Brent Weeks' }
];

const books = [
  { id: 1, name: 'Harry Potter and the Chamber of Secrets', authorId: 1 },
  { id: 2, name: 'Harry Potter and the Prisoner of Azkaban', authorId: 1 },
  { id: 3, name: 'Harry Potter and the Goblet of Fire', authorId: 1 },
  { id: 4, name: 'The Fellowship of the Ring', authorId: 2 },
  { id: 5, name: 'The Two Towers', authorId: 2 },
  { id: 6, name: 'The Return of the King', authorId: 2 },
  { id: 7, name: 'The Way of Shadows', authorId: 3 },
  { id: 8, name: 'Beyond the Shadows', authorId: 3 }
];

const RootQueryType = new GraphQLObjectType({
  name: 'Query',
  description: 'Root Query',
  fields: () => ({
    book: {
      type: BookType,
      description: 'A single book',
      // Query db here in reality
      args: {
        id: { type: GraphQLInt }
      },
      // Instead of this find you do a db query in reality
      resolve: (parent, args) => books.find(book => book.id === args.id)
    },
    author: {
      type: AuthorType,
      description: 'A single author',
      // Query db here in reality
      args: {
        id: { type: GraphQLInt }
      },
      // Instead of this find you do a db query in reality
      resolve: (parent, args) => authors.find(author => author.id === args.id)
    },
    books: {
      type: new GraphQLList(BookType),
      description: 'List of all books',
      // Query db here in reality
      resolve: () => books
    },
    authors: {
      type: new GraphQLList(AuthorType),
      description: 'List of all authors',
      resolve: () => authors
    }
  })
});

const BookType = new GraphQLObjectType({
  name: 'Book',
  description: 'This represents a book',
  fields: () => ({
    // Don't need resolves here because there are actual fields with the corresponding
    // name in the object were pulling from
    id: { type: GraphQLNonNull(GraphQLInt) },
    name: { type: GraphQLNonNull(GraphQLString) },
    authorId: { type: GraphQLNonNull(GraphQLInt) },
    author: {
      type: AuthorType,
      resolve: book => {
        return authors.find(author => {
          return author.id === book.authorId;
        });
      }
    }
  })
});

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  description: 'This represents an author',
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLInt) },
    name: { type: GraphQLNonNull(GraphQLString) },
    books: {
      type: GraphQLList(BookType),
      resolve: author => {
        return books.filter(book => author.id === book.authorId);
      }
    }
  })
});

const RootMutationType = new GraphQLObjectType({
  name: 'Mutation',
  description: 'Root mutation',
  fields: () => ({
    addBook: {
      type: BookType,
      description: 'Adding a book',
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        authorId: { type: GraphQLNonNull(GraphQLInt) }
      },
      resolve: (parent, args) => {
        const book = { id: books.length + 1, name: args.name, authorId: args.authorId };
        books.push(book);
        return book;
      }
    },
    addAuthor: {
      type: AuthorType,
      description: 'Adding an author',
      args: {
        name: { type: GraphQLNonNull(GraphQLString) }
      },
      resolve: (parent, args) => {
        const author = { id: authors.length + 1, name: args.name };
        authors.push(author);
        return author;
      }
    }
  })
});

const schema = new GraphQLSchema({
  query: RootQueryType,
  mutation: RootMutationType
});

// Setup Apollo
const server = new ApolloServer({
  schema: schema
});

server.applyMiddleware({ app });

app.listen({ port }, () =>
  console.log(`Server ready at http://localhost:${port}${server.graphqlPath}`)
);
// me arthur chen
// "accountId": "e2pOVzlZo9KBdWWZyJRbFSYmFwK94nlrsS323noDoEv42VgLpQ16kbac",
// {
// 	"platformId": "NA1",
// 	"gameId": 3373241835,
// 	"champion": 145,
// 	"queue": 420,
// 	"season": 13,
// 	"timestamp": 1586729193463,
// 	"role": "DUO_CARRY",
// 	"lane": "BOTTOM"
// }
// {
// 	"platformId": "NA1",
// 	"gameId": 3373156799,
// 	"champion": 202,
// 	"queue": 420,
// 	"season": 13,
// 	"timestamp": 1586727415119,
// 	"role": "DUO_SUPPORT",
// 	"lane": "NONE"
// }
