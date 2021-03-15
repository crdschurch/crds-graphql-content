import { gql } from "apollo-server-express";

export default gql`
  type Engagement @key(fields: "slug") {
    id: ID!
    slug: String!
    type: String!
    title: String
    contentType: String!
    description : String
    targetUrl: String
    tooltipEarnedContent: String
    tooltipUnearnedContent: String
    disabled: Boolean
  }

  extend type User @key(fields: "id") {
    id: ID! @external
    engagements: [Engagement]
    badges: [Engagement]
    activities: [Engagement]
  }
`;
