import { IContent } from "./content.interface";
import { ContentUtils } from "./content_utils";

export default class Content implements IContent {
  public title: string;
  public contentType: string;
  public category: string;
  public tags: string[];
  public description: string;
  public slug: string;
  public likes: number;
  public id: string;
  public imageUrl: string;
  public date: number;
  public distributionChannels: string[];

  constructor(entry) {
    var fields = entry.fields;
    if (!fields) return;
    this.title = fields.title;
    this.contentType = entry.sys.contentType.sys.id;
    this.category =
      fields.category && fields.category.fields && fields.category.fields.title;
    this.tags =
      fields.tags &&
      fields.tags.map((t) => t.fields && t.fields.title).filter((t) => t);
    this.description = fields.description;
    this.imageUrl =
      fields.image && fields.image.fields
        ? ContentUtils.getImgixURL(fields.image.fields.file.url)
        : null;
    this.likes = fields.interaction_count;
    this.id = entry.sys.id;
    this.slug = fields.slug;
    this.date = new Date(fields.published_at).getTime() / 1000;
    this.distributionChannels =
      fields.distribution_channels &&
      fields.distribution_channels.map((c) => c.site);
  }

  public getQualifiedUrl(): Promise<string> {
    return new Promise((resolve, reject) => {
      resolve(
        `${process.env.CRDS_MEDIA_ENDPOINT}/${this.contentType}s/${this.slug}`
      );
    });
  }
}
