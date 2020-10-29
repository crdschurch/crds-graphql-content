import { gql } from "apollo-server-express";

export default gql`
  extend type Query {
    episodes(id: [ID!], slug: [String!]): [Episode]
  }

  type Episode implements Media {
    id: ID!
    title: String
    contentType: String!
    distributionChannels: [String!]
    likes: Int
    tags: [String!]
    slug: String
    date: Float
    duration: String
    authors: [Author!]
    category: String
    imageUrl: String
    qualifiedUrl: String
    description: String
  }
`;
