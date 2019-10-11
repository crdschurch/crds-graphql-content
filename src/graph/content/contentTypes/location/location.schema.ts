import { gql } from "apollo-server-express";

export default gql`
  extend type Site @key(fields: "id") {
    id: ID! @external
    address: String
    serviceTimes: String
    openHours: String
    mapImageUrl: String
  }
`;
