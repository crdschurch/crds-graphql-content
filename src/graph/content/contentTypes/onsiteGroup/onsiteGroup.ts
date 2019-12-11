import { ContentUtils } from "../../content_utils";
import Content from "../../content.base";
import { IContent } from "../../content.interface";

export default class OnsiteGroup extends Content {
  public footnote: string;
  public detail: string;

  constructor(entry) {
    super(entry);

    var fields = entry.fields;
    this.footnote = fields.footnote;
    this.detail = fields.detail;
  }
}
