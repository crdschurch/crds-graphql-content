import { gql } from "apollo-server-express";

export default gql`
  extend type Query {
    onsiteGroups: [OnsiteGroup!]
  }

  type OnsiteGroup implements Content @key(fields: "id title") @cacheControl(maxAge: 86400) {
      id: ID!
      title: String
      slug: String!
      contentType: String!
      description: String
      detail: String
      length: String
      footnote: String
  }
`;
