import { MongoDataSource } from "apollo-datasource-mongodb";
import { ISocialMediaMongo } from "./social-media.interface";

export class SocialMediaMongo extends MongoDataSource
  implements ISocialMediaMongo {
  constructor(config) {
    super(config);
  }

  public getSocialMediaPosts(
    types?: string[],
    usernames?: string[],
    limit?: number,
    offset?: number
  ): Promise<any> {
    return (<any>this).socialMediaPostsCollection
      .find({
        ...(types ? { "post.source": { $in: types } } : null),
        ...(usernames ? { "post.username": { $in: usernames } } : null),
      })
      .limit(limit || 0)
      .skip(offset || 0)
      .toArray()
      .then((document) => {
        if (!document) return null;
        return document
          .map((a) => {
            a.post.timestamp = new Date(a.post.timestamp).getTime() / 1000;
            return a.post;
          })
          .sort((a, b) => {
            return b.timestamp - a.timestamp;
          });
      });
  }
}
