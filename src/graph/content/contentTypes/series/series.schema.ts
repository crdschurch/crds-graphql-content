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
    messages: [String!] #TODO: make this actually return messages. We need to convert the content service to use a data loader to make this efficient. Not a priority right now so leaving as just titles.
    startDate: Float
    endDate: Float
  }
`;
