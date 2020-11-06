import { gql } from "apollo-server-express";

export default gql`
  extend type Query {
    systemPages(id: [ID!], slug: [String!]): [SystemPage]
  }

  type SystemPage implements Content {
    id: ID!
    title: String
    description: String
    contentType: String!
    distributionChannels: [String!]
    meta: Meta
    searchExcluded: Boolean!
    imageUrl: String
    likes: Int
    tags: [String!]
    date: Float
    qualifiedUrl: String
    viewCount: Int
  }
`;
