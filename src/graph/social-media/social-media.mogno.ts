import { MongoDataSource } from "apollo-datasource-mongodb";
import { ISocialMediaMongo } from "./social-media.interface";

export class SocialMediaMongo extends MongoDataSource
  implements ISocialMediaMongo {
  constructor(config) {
    super(config);
  }

  public getSocialMediaPosts(
    sources?: string[],
    usernames?: string[],
    limit?: number,
    offset?: number
  ): Promise<any> {
    console.log(sources);
    return (<any>this).socialMediaPostsCollection
      .find({
        ...(sources ? { "post.source": { $in: sources } } : null),
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
            a.post.thumbnailUrl = a.post.permalink + "media/?size=m";
            return a.post;
          })
          .sort((a, b) => {
            return b.timestamp - a.timestamp;
          });
      });
  }
}
