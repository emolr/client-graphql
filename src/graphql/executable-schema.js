import { makeExecutableSchema } from 'graphql-tools';
import { resolvers } from './resolvers';
import { schema as typeDefs } from './generated/schema';

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers: resolvers
});

export default schema;
