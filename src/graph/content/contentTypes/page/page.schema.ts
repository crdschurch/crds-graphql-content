import { gql } from "apollo-server-express";

export default gql`
  extend type Query {
    pages(id: [ID!], slug: [String!]): [Page]
  }

  type Page implements Media {
    id: ID!
    title: String
    authors: [Author!]
    duration: String
    date: Float
    category: String
    contentType: String!
    distributionChannels: [String!]
    likes: Int
    tags: [String!]
    slug: String
    imageUrl: String
    qualifiedUrl: String
    body: String
    viewCount: Int
  }
`;
