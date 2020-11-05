import { RequestOptions, RESTDataSource } from "apollo-datasource-rest";

export class PodcastAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = process.env.PODCAST_PLATFORM_API_ENDPOINT;
  }

  public async willSendRequest(request: RequestOptions) {
    request.headers.set("Accept", "application/json; version=1");
  }

  public async getPlayCount(audioBoomId: string): Promise<number> {
    var pageNumber = 1;
    var offset = 0;
    var total = null;
    var pageCount = 150;
    var allEpisodes = [];

    do {
      var response = await this.get(`users/5057586/audio_clips/`, {
        "page[items]": pageCount,
        "page[number]": pageNumber,
      });
      allEpisodes = [...allEpisodes, ...response.body.audio_clips];
      total = response.body.totals.count;
      offset = response.body.totals.offset;
      pageNumber += 1;
    } while (offset + pageCount < total);

    var episode = allEpisodes.find((clip) => clip.id == audioBoomId);
    return episode && episode.counts.plays;
  }
}
