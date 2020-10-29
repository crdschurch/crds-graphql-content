import { ContentUtils } from "../../content_utils";
import Content from "../../content.base";
import Author, { getAuthors } from "../author/author";

export default class Article extends Content {
  public authors: Author[];
  public duration: string;
  public likes: number;

  constructor(entry) {
    super(entry);

    var fields = entry.fields;
    this.authors = getAuthors(fields.author);
    this.duration = ContentUtils.formatDuration(fields.duration);
    this.description = fields.body.substring(0, fields.body.indexOf('\n\n') || fields.body.indexOf('\n'));
    this.likes = fields.likes;
  }
}

