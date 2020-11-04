import { IContext } from "../../../context/context.interface";
import { IContent } from "../../content.interface";
import SystemPage from "./systemPage";

const resolverMap: any = {
  Query: {
    systemPages: (parent, args, { authData, dataSources }: IContext) => {
      return dataSources.contentConnector.getContent({
        content_type: "system_page",
        ...args,
      });
    },
  },
  SystemPage: {
    viewCount: async (
      systemPage: SystemPage,
      args,
      { authData, dataSources }: IContext
    ) => {
      return dataSources.analyticsAPI.getViewCount(
        systemPage.url,
        process.env.GOOGLE_ANALYTICS_VIEW_ID
      );
    },
  },
};

export default resolverMap;
