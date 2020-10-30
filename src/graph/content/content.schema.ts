import { gql } from "apollo-server-express";
import AlbumSchema from "./contentTypes/album/album.schema";
import ArticleSchema from "./contentTypes/article/article.schema";
import AuthorSchema from "./contentTypes/author/author.schema";
import CategorySchema from "./contentTypes/category/category.schema";
import EpisodeSchema from "./contentTypes/episode/episode.schema";
import MessageSchema from "./contentTypes/message/message.schema";
import PageSchema from "./contentTypes/page/page.schema";
import PodcastSchema from "./contentTypes/podcast/podcast.schema";
import PromoSchema from "./contentTypes/promo/promo.schema";
import Serieschema from "./contentTypes/series/series.schema";
import VideoSchema from "./contentTypes/video/video.schema";
import LifeStageSchema from "./contentTypes/lifeStage/lifeStage.schema";
import ContentBlockSchema from "./contentTypes/contentBlock/contentBlock.schema";
import LocationSchema from "./contentTypes/location/location.schema";
import SongSchema from "./contentTypes/song/song.schema";

const ContentSchema = gql`
  interface Content {
    id: ID!
    title: String
    contentType: String!
    distributionChannels: [String!]
    likes: Int
    tags: [String!]
    date: Float
  }

  interface Media {
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
  }
`;

export default [
  ArticleSchema,
  AlbumSchema,
  AuthorSchema,
  CategorySchema,
  EpisodeSchema,
  MessageSchema,
  PageSchema,
  PodcastSchema,
  PromoSchema,
  Serieschema,
  SongSchema,
  VideoSchema,
  LifeStageSchema,
  ContentBlockSchema,
  ContentSchema,
  LocationSchema,
];
