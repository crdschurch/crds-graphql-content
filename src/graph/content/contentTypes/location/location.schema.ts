import { gql } from "apollo-server-express";

export default gql`
  extend type Site @key(fields: "id")  {
    id: ID! @external
    isPhysicalLocation: Boolean! @external
    address: String @requires(fields: "isPhysicalLocation")
    serviceTimes: String @requires(fields: "isPhysicalLocation")
    openHours: String @requires(fields: "isPhysicalLocation")
    mapImageUrl: String @requires(fields: "isPhysicalLocation")
    mapUrl: String @requires(fields: "isPhysicalLocation")
    imageUrl: String @requires(fields: "isPhysicalLocation")
    qualifiedUrl: String
  }
`;
