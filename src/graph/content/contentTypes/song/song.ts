import Content from "../../content.base";
import { ContentUtils } from "../../content_utils";
import Album from "../album/album";

export default class Song extends Content {
  public duration: string;
  public album: Album;
  public spotifyUrl: string;
  public lyrics: string;

  constructor(entry) {
    super(entry);

    var fields = entry.fields;
    if (!fields) return;
    this.duration = ContentUtils.formatDuration(fields.duration);
    this.description = fields.lyrics;
    this.spotifyUrl = fields.spotify_url;
    this.lyrics = ContentUtils.removeMarkdown(fields.lyrics);

    const image =
      fields.bg_image && fields.bg_image.fields
        ? ContentUtils.getImgixURL(fields.bg_image.fields.file.url)
        : null;
    // this.imageUrl = image || this.album.imageUrl
  }

  public getQualifiedUrl(): Promise<string> {
    return new Promise((resolve, reject) => {
      resolve(
        this.album
          ? `${process.env.CRDS_MUSIC_ENDPOINT}/music/${this.album.slug}/${this.slug}`
          : `${process.env.CRDS_MEDIA_ENDPOINT}/${this.contentType}s/${this.slug}`
      );
    });
  }
}
