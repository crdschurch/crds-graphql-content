import Content from "../../content.base";
import { ContentUtils } from "../../content_utils";

export default class Category extends Content {
  constructor(entry) {
    super(entry);

    var fields = entry.fields;
    this.description =
      !fields.subtitle && !fields.body
        ? null
        : [
            ContentUtils.removeMarkdown(fields.subtitle),
            ContentUtils.removeMarkdown(fields.body),
          ].join(" ");
    this.qualifiedUrl = `${process.env.CRDS_MEDIA_ENDPOINT}/topics/${this.slug}`;
  }
}
