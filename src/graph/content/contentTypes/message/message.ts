import Content from "../../content.base";
import { ContentUtils } from "../../content_utils";
import Series from "../series/series";

export default class Message extends Content {
  public duration: string;
  public series: Series;
  public subTitles: string;
  public subTitlesFileUrl: string;

  constructor(entry) {
    super(entry);

    var fields = entry.fields;
    this.duration = ContentUtils.formatDuration(fields.duration);
    this.subTitles = fields.transcription ? ContentUtils.sanitizeSubtitles(fields.transcription) : null;
    this.subTitlesFileUrl = fields.transcription ? `https:${fields.transcription.fields.file.url}` : null;
  }
}
