const MongoClient = require("mongodb").MongoClient;
import { injectable } from "inversify";

@injectable()
export class SocialMediaMongoAuth {
  private static client = null;

  public static getClient(): Promise<any> {
    if (!process.env.COSMOS_CONNECTION_STRING) return;
    return MongoClient.connect(`${process.env.COSMOS_CONNECTION_STRING}`).then(
      client => {
        SocialMediaMongoAuth.client = client;
        return client;
      }
    );
  }

  public static async getCollection(collectionName: string) {
    const client = SocialMediaMongoAuth.client
      ? SocialMediaMongoAuth.client
      : await this.getClient();
    if (!client) return;
    const db = client.db("personalization");
    const collection = db.collection(collectionName);
    return collection;
  }
}
