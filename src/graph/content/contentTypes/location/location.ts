import Content from "../../content.base";
import { ContentUtils } from "../../content_utils";

export default class Location extends Content {
  public serviceTimes: string;
  public map_url: string;
  public mapImageUrl: string;
  public address: string;
  public openHours: string;

  constructor(entry) {
    super(entry);

    var fields = entry.fields;
    this.title = fields.name;
    this.serviceTimes = fields.service_times;
    this.map_url = fields.map_url;
    this.mapImageUrl = ContentUtils.getImgixURL(fields.map_image.fields.file.url);
    this.address = fields.address;
    this.serviceTimes = fields.service_times;
    this.openHours = fields.open_hours;
  }

  public getQualifiedUrl(): Promise<string> {
    return new Promise((resolve, reject) => {
      resolve(`${process.env.CRDS_APP_CLIENT_ENDPOINT}/${this.slug}`);
    });
  }
}
