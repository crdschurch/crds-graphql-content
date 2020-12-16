import { gql } from "apollo-server-express";

export default gql`
  extend type Query {
    videos(id: [ID!], slug: [String!]): [Video]
  }

  type Video implements Media {
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
    qualifiedUrl: String
    description: String
    viewCount: Int
    subTitles: String
    subTitlesFileUrl: String
  }
`;
