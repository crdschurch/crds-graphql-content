import { gql } from "apollo-server-express";

export default gql`
  extend type Query {
    promos(id: [ID!], slug: [String!]): [Promo]
  }

  type Promo implements Media {
    id: ID!
    title: String
    contentType: String!
    distributionChannels: [String!]
    meta: Meta
    searchExcluded: Boolean!
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
    targetAudience: [String]
  }
`;
