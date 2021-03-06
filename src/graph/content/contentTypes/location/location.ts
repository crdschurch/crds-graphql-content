import Content from "../../content.base";
import { ContentUtils } from "../../content_utils";

export default class Location extends Content {
  public serviceTimes: string;
  public mapUrl: string;
  public mapImageUrl: string;
  public address: string;
  public openHours: string;
  public imageUrl: string;
  public site_id: string;
  public qualifiedUrl: string;

  constructor(entry) {
    super(entry);

    var fields = entry.fields;
    this.title = fields.name;
    this.serviceTimes = fields.service_times;
    this.mapUrl = fields.map_url;
    this.mapImageUrl = fields.map_image && fields.map_image.fields && ContentUtils.getImgixURL(fields.map_image.fields.file.url);
    this.address = fields.address;
    this.serviceTimes = fields.service_times;
    this.openHours = fields.open_hours;
    this.description = fields.description; 
    this.site_id = fields.site_id;
    this.qualifiedUrl = `${process.env.CRDS_APP_CLIENT_ENDPOINT}/${this.slug}`;
  }
}
