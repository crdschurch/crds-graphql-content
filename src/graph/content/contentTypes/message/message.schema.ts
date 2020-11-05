import { gql } from "apollo-server-express";

export default gql`
  extend type Query {
    messages(id: [ID!], limit: Int, skip: Int): [Message]
  }

  type Message implements Media {
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
    description: String
    series: Series
    viewCount: Int
  }
`;
