import Content from "../../content.base";
import { ContentUtils } from "../../content_utils";
import { Types } from "../../../../ioc/types";
import Series from "../series/series";
import container from "../../../../ioc/inversify.config";
import { ContentConnector } from "../../content.connector";
import { IContent } from "../../content.interface";
import { Author } from "..";
import { getAuthors } from "../author/author";

export default class Message extends Content {
  public duration: string;
  public series: Series;
  public authors: Author[];

  constructor(entry) {
    super(entry);

    var fields = entry.fields;
    this.authors = getAuthors(fields.author);
    this.duration = ContentUtils.formatDuration(fields.duration);
  }
}
