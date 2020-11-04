import { IContext } from "../../../context/context.interface";
import { IContent } from "../../content.interface";

const resolverMap: any = {
  Query: {
    authors: (parent, args, { authData, dataSources }: IContext) => {
      return dataSources.contentConnector.getContent({
        content_type: "author",
        ...args,
      });
    },
  },
  Author: {
    url: (
      author: IContent,
      args,
      { authData, dataSources }: IContext
    ) => {
      return author.getUrl();
    },
    viewCount: (
      author: IContent,
      args,
      { authData, dataSources }: IContext
    ) => {
      return dataSources.analyticsAPI.getViewCount(author.slug, process.env.GOOGLE_ANALYTICS_VIEW_ID);
    },
  },
};

export default resolverMap;
