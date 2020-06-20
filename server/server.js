/* eslint-disable func-names */
/* eslint-disable prettier/prettier */
const express = require('express');
const { ApolloServer } = require('apollo-server-express');

const port = 5000;
const app = express();

const schema = require('./resolvers');

// const RootMutationType = new GraphQLObjectType({
//   name: 'Mutation',
//   description: 'Root mutation',
//   fields: () => ({
//     addBook: {
//       type: BookType,
//       description: 'Adding a book',
//       args: {
//         name: { type: GraphQLNonNull(GraphQLString) },
//         authorId: { type: GraphQLNonNull(GraphQLInt) }
//       },
//       resolve: (parent, args) => {
//         const book = { id: books.length + 1, name: args.name, authorId: args.authorId };
//         books.push(book);
//         return book;
//       }
//     },
//     addAuthor: {
//       type: AuthorType,
//       description: 'Adding an author',
//       args: {
//         name: { type: GraphQLNonNull(GraphQLString) }
//       },
//       resolve: (parent, args) => {
//         const author = { id: authors.length + 1, name: args.name };
//         authors.push(author);
//         return author;
//       }
//     }
//     // updateSummoner: {
//     //   type: new Grap()
//     // }
//   })
// });

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
