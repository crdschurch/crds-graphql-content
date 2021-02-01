import { gql } from "apollo-server-express";

export default gql`
  extend type Query {
    signUps(id: [ID!], slug: [String!]): [SignUp]
  }

  type SignUp {
    id: ID!
    title: String
    contentType: String!
    body: String
    type: String!
    opportunityId: ID
    groupId: ID
    existingMemberContent: String
    successContent: String
    waitListContent: String
    waitListSuccessContent: String
    fullContent: String
    meta: Meta
    tags: [String!]
    date: Float
    qualifiedUrl: String
  }
`;
