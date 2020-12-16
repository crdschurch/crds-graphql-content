import { Message } from "..";
import Content from "../../content.base";
import { ContentFactory } from "../../content.factory";
import { ContentUtils } from "../../content_utils";

export default class Series extends Content {
  public startDate: number;
  public endDate: number;
  public messages: Message[];

  constructor(entry) {
    super(entry);

    var fields = entry.fields;
    this.startDate = new Date(fields.starts_at).getTime() / 1000;
    this.endDate = new Date(fields.ends_at).getTime() / 1000;
    this.messages =
      fields.videos &&
      fields.videos
        .filter((m) => m && m.fields)
        .map((video) => video.fields && ContentFactory.instantiate(video));
  }
}
