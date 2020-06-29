import { gql } from "apollo-server-express";
import contentSchema from "./graph/content/content.schema";
import socialMediaSchema from "./graph/social-media/social-media.schema";

const linkSchema = gql`
  type Query {
    _: Boolean
  }

  type Mutation {
    _: Boolean
  }

  directive @cacheControl(
    maxAge: Int
    scope: CacheControlScope
  ) on OBJECT | FIELD_DEFINITION

  enum CacheControlScope {
    PUBLIC
    PRIVATE
  }
`;

export default [linkSchema, ...contentSchema, socialMediaSchema];
