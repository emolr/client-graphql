
const gql = require('graphql-tag')

const schema = gql`
  type Pokemon {
  id: Int!
  name: String!
  image: String!
  type: String!
}

type Query {
  pokemon(id: Int!): Pokemon!
  pokemons(offset: Int, first: Int): [Pokemon!]!
}

`

module.exports = {
  default: schema,
  schema
}
