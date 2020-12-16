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
    qualifiedUrl: async (
      message: IContent,
      args,
      { authData, dataSources }: IContext
    ) => {
      var series = await dataSources.contentConnector.getSeries(message.id);
      return `${process.env.CRDS_MEDIA_ENDPOINT}/series${
        series ? "/" + series.slug : ""
      }/${message.slug}`;
    },
    viewCount: (
      message: IContent,
      args,
      { authData, dataSources }: IContext
    ) => {
      return dataSources.bitmovinAnalyticsAPI.getViewCount(message.title);
    },
    series: async (
      message: Message,
      args,
      { authData, dataSources }: IContext
    ) => {
      return dataSources.contentConnector.getSeries(message.id);
    },
  },
};

export default resolverMap;
