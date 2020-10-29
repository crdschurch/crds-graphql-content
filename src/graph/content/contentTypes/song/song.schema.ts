import { gql } from "apollo-server-express";

export default gql`
  extend type Query {
    songs(id: [ID!], slug: [String!]): [Song]
  }

  type Song implements Media {
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
    description: String
    viewCount: Int
    album: Album
    lyrics: String
    artist: String
  }
`;
