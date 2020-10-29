import { ContentUtils } from "../../content_utils";
import Content from "../../content.base";
import Author, { getAuthors } from "../author/author";
import { Song } from "..";

export default class Album extends Content {
  public authors: Author[];
  public duration: string;
  public referenceContent: any;
  public songs: Song[];
  public spotifyUrl: string;
  public publisher: string;

  constructor(entry) {
    super(entry);

    var fields = entry.fields;
    this.authors = getAuthors(fields.author);
    this.duration = ContentUtils.formatDuration(fields.duration);
    this.songs =
      (fields.songs && fields.songs.map((song) => new Song(song))) || [];
    this.spotifyUrl = fields.spotify_url;
    this.publisher = fields.publisher;
  }

  public getQualifiedUrl(): Promise<string> {
    return new Promise((resolve, reject) => {
      resolve(`${process.env.CRDS_MUSIC_ENDPOINT}/music/${this.slug}`);
    });
  }
}
