import { IContext } from "../../../context/context.interface";
import { IContent } from "../../content.interface";

const resolverMap: any = {
  Query: {
    pages: (parent, args, { authData, dataSources }: IContext) => {
      return dataSources.contentConnector.getContent({
        content_type: "page",
        ...args,
      });
    },
  },
  Page: {
    qualifiedUrl: (page: IContent, args, { authData, dataSources }: IContext) => {
      return page.getUrl();
    },
    viewCount: async (
      page: IContent,
      args,
      { authData, dataSources }: IContext
    ) => {
      return dataSources.analyticsAPI.getViewCount(
        await page.getUrl(),
        process.env.GOOGLE_ANALYTICS_VIEW_ID
      );
    },
  },
};

export default resolverMap;
