import { IContext } from "../../../context/context.interface";
import { IContent } from "../../content.interface";

const resolverMap: any = {
  Query: {
    podcasts: (parent, args, { authData, dataSources }: IContext) => {
      return dataSources.contentConnector.getContent({
        content_type: "podcast",
        ...args,
      });
    },
  },
  Podcast: {
    url: (
      podcast: IContent,
      args,
      { authData, dataSources }: IContext
    ) => {
      return podcast.getUrl();
    },
    episodes: (
      podcast: IContent,
      args,
      { authData, dataSources }: IContext
    ) => {
      return dataSources.contentConnector.getContent({
        content_type: "episode",
        "podcast.sys.id": podcast.id,
      });
    },
  },
};

export default resolverMap;
