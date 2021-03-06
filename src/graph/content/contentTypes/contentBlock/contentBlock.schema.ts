import { gql } from "apollo-server-express";

export default gql`
  extend type Query {
    contentBlocks(filters: ContentBlockInput): [ContentBlock]
  }

  input ContentBlockInput {
    category: String
    slug: [String!]
  }

  type ContentBlock implements Content {
    id: ID!
    title: String
    contentType: String!
    distributionChannels: [String!]
    meta: Meta
    searchExcluded: Boolean!
    likes: Int
    tags: [String!]
    date: Float
    slug: String!
    content: String
    type: String!
    category: String!
  }
`;
