import { ContentUtils } from "../../content_utils";
import Content from "../../content.base";
import Podcast from "../podcast/podcast";

export default class Episode extends Content {
  public duration: string;
  public podcast: Podcast;
  public transcription: string;
  public podcastPlatformId: string;

  constructor(entry) {
    super(entry);

    var fields = entry.fields;
    this.duration = ContentUtils.formatDuration(fields.duration);

    this.transcription = fields.transcription;
    this.podcast = new Podcast(fields.podcast);
    this.imageUrl = this.imageUrl || this.podcast.imageUrl;
    var reg = new RegExp(/(?<=\/posts\/)(\d+)/);
    var matches = fields.audio_embed_code && fields.audio_embed_code.match(reg);
    this.podcastPlatformId = matches && matches[0];
  }

  public getUrl(): Promise<string> {
    return new Promise((resolve, reject) => {
      resolve(
        `${process.env.CRDS_MEDIA_ENDPOINT}/podcasts/${this.podcast.slug}/${this.slug}`
      );
    });
  }
}
