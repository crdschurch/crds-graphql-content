import Content from "../../content.base";
import { ContentUtils } from "../../content_utils";

export default class Category extends Content {
  constructor(entry) {
    super(entry);

    var fields = entry.fields;
    this.description = ContentUtils.removeMarkdown(
      fields.subtitle + " " + fields.body
    );
  }

  public getUrl(): Promise<string> {
    return new Promise((resolve, reject) => {
      resolve(`${process.env.CRDS_MEDIA_ENDPOINT}/topics/${this.slug}`);
    });
  }
}
