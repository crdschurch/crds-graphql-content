import { IPodcastAPI } from "./podcast.interface";

import { RESTDataSource, RequestOptions } from "apollo-datasource-rest";

class PodcastAPI extends RESTDataSource implements IPodcastAPI {
  constructor() {
    super();
    this.baseURL = process.env.SPOTIFY_API_ENDPOINT;
  }
  getPlayCount(id: string): Promise<number> {
    throw new Error("Method not implemented.");
  }


}

module.exports = PodcastAPI;
