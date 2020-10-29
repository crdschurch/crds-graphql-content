import { Message, Series } from "..";
import { IContext } from "../../../context/context.interface";
import { IContent } from "../../content.interface";

const resolverMap: any = {
  Query: {
    messages: async (parent, args, { authData, dataSources }: IContext) => {
      return dataSources.contentConnector.getContent({
        content_type: "message",
        ...args,
      });
    },
  },
  Message: {
    qualifiedUrl: (
      message: IContent,
      args,
      { authData, dataSources }: IContext
    ) => {
      return message.getQualifiedUrl();
    },
    viewCount: (message: IContent, args, { authData, dataSources }: IContext) => {
      return dataSources.bitmovinAnalyticsAPI.getViewCount(message.title);
    },
    series: async (
      message: Message,
      args,
      { authData, dataSources }: IContext
    ) => {
      return dataSources.contentConnector
        .getContent({
          content_type: "series",
          "videos.sys.id": message.id,
        })
        .then((series: IContent[]) => {
          return series.find(() => true);
        });
    },
  },
};

export default resolverMap;
