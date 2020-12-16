import { IContent } from "./content.interface";
import { ContentUtils } from "./content_utils";

export class Meta {
  public title: string;
  public description: string;
  public imageUrl: string;
  public distributionChannels: string[];
}

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
  public searchExcluded: boolean;
  public meta: Meta;
  public qualifiedUrl: string;

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
    this.date = Math.floor(new Date(fields.published_at || entry.sys.createdAt).getTime() / 1000);
    this.distributionChannels =
      fields.distribution_channels &&
      fields.distribution_channels.map((c) => c.site);
    this.searchExcluded = fields.search_excluded || false;
    this.meta = fields.meta &&
      fields.meta.fields && {
        description: fields.meta.fields.description,
        title: fields.meta.fields.title,
        imageUrl:
          fields.meta.fields.image && fields.meta.fields.image.fields
            ? ContentUtils.getImgixURL(fields.meta.fields.image.fields.file.url)
            : null,
        distributionChannels:
          fields.meta.fields.distribution_channels &&
          fields.meta.fields.distribution_channels.map((c) => c.site),
      };
  }

  public getUrl(): Promise<string> {
    return new Promise((resolve, reject) => {
      resolve(
        `${process.env.CRDS_MEDIA_ENDPOINT}/${this.contentType}s/${this.slug}`
      );
    });
  }
}
