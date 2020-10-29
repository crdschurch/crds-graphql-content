import { IMusicAPI } from "./music.interface";
import fetch from "node-fetch";
import { RESTDataSource, RequestOptions } from "apollo-datasource-rest";

export class MusicAPI extends RESTDataSource implements IMusicAPI {
  constructor() {
    super();
    this.baseURL = process.env.SONG_PLATFORM_API_ENDPOINT;
  }

  async willSendRequest(request: RequestOptions) {
    var token = await fetch(
      "https://open.spotify.com/get_access_token?reason=transport&productType=web_player"
    ).then((res) => res.json());
    request.headers.set("Authorization", `Bearer ${token.accessToken}`);
  }

  async getPlayCount(
    albumId: string,
    songId?: string,
    songTitle?: string
  ): Promise<number> {
    if (!albumId) return;
    var spotifyAlbum = await this.get(
      `/query?operationName=queryAlbumTracks&variables=%7B%22uri%22%3A%22spotify%3Aalbum%3A${albumId}%22%2C%22offset%22%3A0%2C%22limit%22%3A300%7D&extensions=%7B%22persistedQuery%22%3A%7B%22version%22%3A1%2C%22sha256Hash%22%3A%223ea563e1d68f486d8df30f69de9dcedae74c77e684b889ba7408c589d30f7f2e%22%7D%7D`
    );

    var album = spotifyAlbum && spotifyAlbum.data && spotifyAlbum.data.album;
    if (!songId) return this.getAlbumPlayCount(album);
    var song =
      album &&
      album.tracks &&
      album.tracks.items.find(
        (song) =>
          song.track.uri.includes(songId) || song.track.name == songTitle
      );
    return song && song.track.playcount;
  }

  private getAlbumPlayCount(album: any) {
    return (
      album &&
      album.tracks &&
      album.tracks.items.reduce((playCount, song) => {
        return playCount + Number(song.track.playcount);
      }, 0)
    );
  }
}
