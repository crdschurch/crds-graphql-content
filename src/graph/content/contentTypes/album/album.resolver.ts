import { IContext } from "../../../context/context.interface";
import { IContent } from "../../content.interface";
import Album from "./album";

const resolverMap: any = {
  Query: {
    albums: (parent, args, { authData, dataSources }: IContext) => {
      return dataSources.contentConnector.getContent({
        content_type: "album",
        ...args,
      });
    },
  },
  Album: {
    qualifiedUrl: (album: Album, args, { authData, dataSources }: IContext) => {
      return album.getUrl();
    },
    songs: (album: Album, args, { authData, dataSources }: IContext) => {
      return album.songs.filter(s => s).map((song) => {
        return { ...song, album: album };
      });
    },
    viewCount: (album: Album, args, { authData, dataSources }: IContext) => {
      return dataSources.musicAPI.getPlayCount(
        album.spotifyUrl && album.spotifyUrl.split("/").pop()
      );
    },
  },
};

export default resolverMap;
