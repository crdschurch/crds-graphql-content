import { Episode } from "..";
import { IContext } from "../../../context/context.interface";
import { IContent } from "../../content.interface";

const resolverMap: any = {
  Query: {
    episodes: (parent, args, { authData, dataSources }: IContext) => {
      return dataSources.contentConnector.getContent({
        content_type: "episode",
        ...args,
      });
    },
  },
  Episode: {
    qualifiedUrl: (
      episode: IContent,
      args,
      { authData, dataSources }: IContext
    ) => {
      return episode.getUrl();
    },
    viewCount: (
      episode: Episode,
      args,
      { authData, dataSources }: IContext
    ) => {
      if (!episode.podcastPlatformId) return null;
      return dataSources.podcastAPI.getPlayCount(episode.podcastPlatformId);
    },
  },
};

export default resolverMap;
