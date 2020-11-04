import { gql } from "apollo-server-express";

export default gql`
  extend type Query {
    authors(id: [ID!], slug: [String!]): [Author]
  }

  type Author implements Media {
    id: ID!
    title: String
    contentType: String!
    distributionChannels: [String!]
    meta: Meta
    searchExcluded: Boolean!
    likes: Int
    tags: [String!]
    date: Float
    slug: String
    duration: String
    authors: [Author!]
    category: String
    imageUrl: String
    url: String
    summary: String
    fullName: String
  }
`;
