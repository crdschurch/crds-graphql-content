import { gql } from "apollo-server-express";

export default gql`
  extend type Query {
    series(id: [ID!], slug: [String!]): [Series]
  }

  type Series implements Media {
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
    messages: [Message]
    startDate: Float
    endDate: Float
  }
`;
