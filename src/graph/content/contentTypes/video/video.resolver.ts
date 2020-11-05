import { IContext } from "../../../context/context.interface";
import { IContent } from "../../content.interface";

const resolverMap: any = {
  Query: {
    videos: (parent, args, { authData, dataSources }: IContext) => {
      return dataSources.contentConnector.getContent({
        content_type: "video",
        ...args,
      });
    },
  },
  Video: {
    url: (
      video: IContent,
      args,
      { authData, dataSources }: IContext
    ) => {
      return video.getUrl();
    },
    viewCount: (
        video: IContent,
        args,
        { authData, dataSources }: IContext
      ) => {
          return dataSources.bitmovinAnalyticsAPI.getViewCount(video.title);
      }
  },
};

export default resolverMap;
