import { gql } from "apollo-server-express";

export default gql`
  extend type Query {
    searchWidgets(id: [ID!], slug: [String!]): [SearchWidget]
  }

  type SearchWidget implements Content {
    id: ID!
    title: String
    contentType: String!
    distributionChannels: [String!]
    meta: Meta
    searchExcluded: Boolean!
    likes: Int
    tags: [String!]
    date: Float
    body: String
    url: String
  }
`;
