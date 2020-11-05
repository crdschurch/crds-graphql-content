import { gql } from "apollo-server-express";

export default gql`
  extend type Query {
    categories(id: [ID!], slug: [String!]): [Category]
  }

  type Category implements Content {
    id: ID!
    title: String
    contentType: String!
    distributionChannels: [String!]
    meta: Meta
    searchExcluded: Boolean!
    description: String
    likes: Int
    tags: [String!]
    date: Float
    imageUrl: String
    url: String
  }
`;
