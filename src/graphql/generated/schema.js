
import gql from 'graphql-tag'

export const schema = gql`
  type Pokemon {
  id: String!
  name: String!
  image: String!
  type: String!
}

type Query {
  pokemon(name: String!): Pokemon!
}

`

export default schema
