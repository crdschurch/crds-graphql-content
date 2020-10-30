import { gql } from "apollo-server-express";

export default gql`
  extend type Query {
    articles(id: [ID!], slug: [String!]): [Article]
  }

  type Article implements Media {
    id: ID!
    title: String
    contentType: String!
    distributionChannels: [String!]
    likes: Int
    tags: [String!]
    date: Float
    slug: String
    duration: String
    authors: [Author!]
    category: String
    imageUrl: String
    qualifiedUrl: String
    body: String
    viewCount: Int
    leadText: String
  }
`;
