import ApolloClient from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import SchemaLink from 'apollo-link-schema';
import { InMemoryCache } from 'apollo-cache-inmemory';

import { schema } from './graphql/api/executable-schema';
import { http } from './graphql/api/http';

export const graphqlClient = new ApolloClient({
  link: ApolloLink.from([
    new SchemaLink({
      schema: schema,
      context: () => {
        return {
          http: http
        };
      }
    })
  ]),
  cache: new InMemoryCache()
});
