import { ContentUtils } from "../../content_utils";
import Content from "../../content.base";

export default class SystemPage extends Content {
  public url: string;

  constructor(entry) {
    super(entry);

    var fields = entry.fields;
    this.imageUrl =
      fields.meta && fields.meta.fields.image
        ? ContentUtils.getImgixURL(fields.meta.fields.image.fields.file.url)
        : this.imageUrl;
    this.description = fields.description;
    this.slug = fields.url;
    var r = new RegExp("^(?:[a-z]+:)?//", "i");
    this.url = r.test(fields.url)
      ? fields.url
      : `${process.env.CRDS_CLIENT_ENDPOINT}${fields.url}`;
  }
}
