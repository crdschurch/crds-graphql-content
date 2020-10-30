import { RESTDataSource } from "apollo-datasource-rest";

export class PodcastAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = process.env.PODCAST_PLATFORM_API_ENDPOINT;
  }

  public async getPlayCount(audioBoomId: string): Promise<number> {
    var response = await this.get(`users/5057586/audio_clips/${audioBoomId}`);
    return response.body.audio_clip.counts.plays;
  }
}
