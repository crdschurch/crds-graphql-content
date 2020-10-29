import { gql } from "apollo-server-express";

export default gql`
  extend type Query {
    lifeStages: [LifeStage!]
  }

  type LifeStage implements Content @key(fields: "id title") @cacheControl(maxAge: 86400) {
    id: ID!
    title: String
    description: String
    imageUrl: String!
    date: Float
    contentTotal: String!
    contentType: String!
    distributionChannels: [String!]
    likes: Int
    tags: [String!]
    content: [LifeStageContent]
  }

  type LifeStageContent implements Media {
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
    lifeStageid: ID!
  }

  input LifeStageInput {
    id: ID!
    title: String
  }
  `;
