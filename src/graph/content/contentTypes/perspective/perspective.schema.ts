import { gql } from "apollo-server-express";

export default gql`
  extend type Query {
    perspectives(id: [ID!], slug: [String!]): [Perspective]
  }

  type Perspective implements Content {
    id: ID!
    title: String
    contentType: String!
    body: String
    distributionChannels: [String!]
    meta: Meta
    searchExcluded: Boolean!
    likes: Int
    tags: [String!]
    date: Float
    url: String
  }
`;
