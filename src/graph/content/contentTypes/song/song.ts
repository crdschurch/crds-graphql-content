import Content from "../../content.base";
import { ContentUtils } from "../../content_utils";
import Album from "../album/album";

export default class Song extends Content {
  public duration: string;
  public album: Album;
  public spotifyUrl: string;
  public lyrics: string;
  public artist: string;

  constructor(entry) {
    super(entry);

    var fields = entry.fields;
    if (!fields) return;
    this.duration = ContentUtils.formatDuration(fields.duration);
    this.description = fields.description;
    this.spotifyUrl = fields.spotify_url;
    this.lyrics = ContentUtils.removeMarkdown(fields.lyrics);
    this.artist = fields.artist;

    const image =
      fields.bg_image && fields.bg_image.fields
        ? ContentUtils.getImgixURL(fields.bg_image.fields.file.url)
        : null;
    this.imageUrl = image || this.album.imageUrl;
  }
}
