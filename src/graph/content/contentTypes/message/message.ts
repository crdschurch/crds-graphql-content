import Content from "../../content.base";
import { ContentUtils } from "../../content_utils";
import { Types } from "../../../../ioc/types";
import Series from "../series/series";
import container from "../../../../ioc/inversify.config";
import { ContentConnector } from "../../content.connector";
import { IContent } from "../../content.interface";

export default class Message extends Content {
  public duration: string;
  public series: Series;

  constructor(entry) {
    super(entry);

    var fields = entry.fields;
    this.duration = ContentUtils.formatDuration(fields.duration);
  }
}
