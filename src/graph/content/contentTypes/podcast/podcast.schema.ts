import { gql } from "apollo-server-express";

export default gql`
  extend type Query {
    podcasts(id: [ID!], slug: [String!]): [Podcast]
  }

  type Podcast implements Media {
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
    episodes: [Episode!]
  }
`;
