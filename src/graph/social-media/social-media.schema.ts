import { gql } from "apollo-server-express";

export default gql`
  extend type Query {
    socialMediaPosts(sources: [String!], usernames: [String!], limit: Int, offset: Int): [SocialMediaPost!]
  }

  type SocialMediaPost @key(fields: "id") {
    id: ID!
    username: String
		thumbnailUrl: String
		caption: String
		mediaType: String
		mediaUrl: String
		permalink: String
		timestamp: Float
		source: String
  }
`;
