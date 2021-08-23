import { makeExecutableSchema } from '@graphql-tools/schema';
import { resolvers } from './resolvers';
import { schema as typeDefs } from './generated/schema';

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers: resolvers as any
});

export default schema;
