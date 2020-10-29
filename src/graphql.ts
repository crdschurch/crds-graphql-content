import { ApolloServer } from "apollo-server-express";
import { Express } from "express";
import * as http from "http";
import { inject, injectable } from "inversify";
import { Types } from "./ioc/types";
import schema from "./schema";
import resolvers from "./resolvers";
import responseCachePlugin from "apollo-server-plugin-response-cache";
import { IContentService } from "./graph/content/content.interface";
import { IDataSources } from "./graph/context/context.interface";
import { buildFederatedSchema } from "@apollo/federation";
import { ContentConnector } from "./graph/content/content.connector";
import { RedisCache } from "apollo-server-cache-redis";
import { SocialMediaMongoAuth } from "./graph/auth/auth.socialMedia.mongo";
import { SocialMediaMongo } from "./graph/social-media/social-media.mogno";
import { AnalyticsAPI } from "./sources/analytics/analytics.api";
import { MusicAPI } from "./sources/music/music.api";
import { BitmovinAnalyticsAPI } from "./sources/analytics/bitmovinAnalytics.api";

@injectable()
export class GraphqlServer {
  public set express(v: Express) {
    this.app = v;
  }
  private app: Express;
  private serverInstance: http.Server;

  constructor(
    @inject(Types.ContentService) private contentService: IContentService
  ) {}

  public async start(): Promise<void> {
    let app = this.app;

    const socialMediaPostsCollection = await SocialMediaMongoAuth.getCollection(
      "SocialMediaPosts"
    );

    const server = new ApolloServer({
      schema: buildFederatedSchema({
        typeDefs: schema,
        resolvers,
      }),
      context: ({ req }) => {
        if (!!!req.body.query || req.body.query.includes("IntrospectionQuery"))
          return;
        const forceRefresh = req.headers.force_refresh === "true";
        return { forceRefresh: forceRefresh };
      },
      dataSources: (): any => {
        return <IDataSources>{
          contentConnector: new ContentConnector(this.contentService),
          socialMediaMongo: new SocialMediaMongo({
            socialMediaPostsCollection,
          }),
          analyticsAPI: new AnalyticsAPI(),
          musicAPI: new MusicAPI(),
          bitmovinAnalyticsAPI: new BitmovinAnalyticsAPI()
        };
      },
      plugins: [
        responseCachePlugin({
          sessionId: (requestContext) =>
            requestContext.request.http.headers.get("authorization") || null,
          shouldReadFromCache: (requestContext) => {
            return !requestContext.context.forceRefresh;
          },
        }),
      ],
      cache: new RedisCache(
        `redis://:${process.env.REDIS_PASSWORD}@${process.env.REDIS_HOST}/${process.env.REDIS_DB}`
      ),
    });

    server.applyMiddleware({ app, path: "/" });

    app.listen({ port: 8003 }, () => {});
  }

  public stop() {
    this.serverInstance.close();
  }
}
