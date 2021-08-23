import { makeExecutableSchema } from '@graphql-tools/schema';
import { resolvers } from './resolvers';
// import { schema as typeDefs } from './generated/schema';

const typeDefs = `
  type Query {
    pokemon(id: Int!): Pokemon!
    pokemons(offset: Int, first: Int): [Pokemon!]!
  }

  type Pokemon {
    id: Int!
    name: String!
    image: String!
    type: String!
  }
`;

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers: resolvers as any
});

export default schema;
