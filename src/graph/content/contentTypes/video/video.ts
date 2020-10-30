import Content from "../../content.base";
import { ContentUtils } from "../../content_utils";

export default class Video extends Content {
  public duration: string;

  constructor(entry) {
    super(entry);

    var fields = entry.fields;
    this.duration = ContentUtils.formatDuration(fields.duration);
  }
}
