import { gql } from "apollo-server-express";

export default gql`
  extend type Engagement @key(fields: "id") {
    id: ID! @external
    title: String
    contentType: String!
    description : String
    targetUrl: String
    tooltipEarnedContent: String
    tooltipUnearnedContent: String
    disabled: Boolean
  }
`;
