import Content from "../../content.base";
import { ContentUtils } from "../../content_utils";

export default class Promo extends Content {
  public targetAudience: string[];

  constructor(entry) {
    super(entry);

    var fields = entry.fields;
    this.slug = fields.link_url;
    this.description = fields.description;
    this.targetAudience = fields.target_audience;
  }

  public getQualifiedUrl(): Promise<string> {
    return new Promise((resolve, reject) => {
      resolve(this.slug);
    });
  }
}

