import { Episode } from "..";
import Content from "../../content.base";
import { ContentUtils } from "../../content_utils";
import Author, { getAuthors } from "../author/author";

export default class Podcast extends Content {
  public authors: Author[];
  public episodes: Episode[];

  constructor(entry) {
    super(entry);

    var fields = entry.fields;
    this.authors = getAuthors(fields.author);
  }
}
