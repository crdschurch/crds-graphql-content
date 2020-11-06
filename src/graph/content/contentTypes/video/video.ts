import { Author } from "..";
import Content from "../../content.base";
import { ContentUtils } from "../../content_utils";
import { getAuthors } from "../author/author";

export default class Video extends Content {
  public duration: string;
  public authors: Author[];

  constructor(entry) {
    super(entry);

    var fields = entry.fields;
    this.duration = ContentUtils.formatDuration(fields.duration);
    this.authors = getAuthors(fields.author);
  }
}
