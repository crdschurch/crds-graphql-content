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
      return episode.getQualifiedUrl();
    },
    viewCount: (
      episode: IContent,
      args,
      { authData, dataSources }: IContext
    ) => {
      return dataSources.analyticsAPI.getViewCount(episode.slug, process.env.GOOGLE_ANALYTICS_VIEW_ID);
    },
  },
};

export default resolverMap;
