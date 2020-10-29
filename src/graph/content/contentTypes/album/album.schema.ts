import { gql } from "apollo-server-express";

export default gql`
  extend type Query {
    albums(id: [ID!], slug: [String!]): [Album]
  }

  type Album implements Media {
    id: ID!
    title: String
    authors: [Author!]
    duration: String
    category: String
    contentType: String!
    distributionChannels: [String!]
    date: Float
    likes: Int
    tags: [String!]
    slug: String
    imageUrl: String
    qualifiedUrl: String
    description: String
    viewCount: Int
    songs: [Song!]
  }
`;
