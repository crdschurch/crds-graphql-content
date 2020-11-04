import { ContentUtils } from "../../content_utils";
import Content from "../../content.base";

export default class SearchWidget extends Content {
  public body: string;
  public url: string;

  constructor(entry) {
    super(entry);

    var fields = entry.fields;
    this.imageUrl =
      fields.meta && fields.meta.fields.image
        ? ContentUtils.getImgixURL(fields.meta.fields.image.fields.file.url)
        : this.imageUrl;
    this.body = fields.body;
    this.url = `${process.env.CRDS_APP_CLIENT_ENDPOINT}${this.slug}`;
  }
}
