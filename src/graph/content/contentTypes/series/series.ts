import Content from "../../content.base";
import { ContentUtils } from "../../content_utils";

export default class Series extends Content {
  public startDate: number;
  public endDate: number;
  public messages: string[];

  constructor(entry) {
    super(entry);

    var fields = entry.fields;
    this.startDate = new Date(fields.starts_at).getTime() / 1000;
    this.endDate = new Date(fields.ends_at).getTime() / 1000;
    this.messages =
      fields.videos &&
      fields.videos
        .map((video) => video.fields && video.fields.title)
        .filter((m) => m);
  }

  public getQualifiedUrl(): Promise<string> {
    return new Promise((resolve, reject) => {
      resolve(
        `${process.env.CRDS_MEDIA_ENDPOINT}/${this.contentType}/${this.slug}`
      );
    });
  }
}
