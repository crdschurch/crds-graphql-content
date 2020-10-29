import { IEpisodeAPI } from "./episode.interface";

import { RESTDataSource, RequestOptions } from "apollo-datasource-rest";

class EpisodeAPI extends RESTDataSource implements IEpisodeAPI {
  constructor() {
    super();
    this.baseURL = process.env.PODCAST_PLATFORM_API_ENDPOINT;
  }

  getPlayCount(id: string): Promise<number> {
    return this.get('/audio_clips/*audio_clip_id')
  }
}

module.exports = EpisodeAPI;
