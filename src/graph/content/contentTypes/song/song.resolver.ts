import { IContext } from "../../../context/context.interface";
import { IContent } from "../../content.interface";
import Album from "../album/album";
import Song from "./song";

const resolverMap: any = {
  Query: {
    songs: async (parent, args, { authData, dataSources }: IContext) => {
      var songs = await dataSources.contentConnector.getContent({
        content_type: "song",
        ...args,
      });

      return await dataSources.contentConnector
        .getContent({ content_type: "album" })
        .then((albums: Album[]) => {
          return songs.map((song: any) => {
            const album = albums.find((a) =>
              a.songs.find((s) => s && s.id == song.id)
            );
            if (album) song.album = album;
            return song;
          });
        });
    },
  },
  Song: {
    qualifiedUrl: (song: Song, args, { authData, dataSources }: IContext) => {
      return song.album
        ? `${process.env.CRDS_MUSIC_ENDPOINT}/music/${song.album.slug}/${song.slug}`
        : `${process.env.CRDS_MEDIA_ENDPOINT}/${song.contentType}s/${song.slug}`;
    },
    viewCount: async (
      song: Song,
      args,
      { authData, dataSources }: IContext
    ) => {
      return dataSources.musicAPI.getPlayCount(
        song.album &&
          song.album.spotifyUrl &&
          song.album.spotifyUrl.split("/").pop(),
        song.spotifyUrl && song.spotifyUrl.split("/").pop(),
        song.title
      );
    },
  },
};

export default resolverMap;
