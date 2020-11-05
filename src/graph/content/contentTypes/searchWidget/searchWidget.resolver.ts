import { IContext } from "../../../context/context.interface";
import { IContent } from "../../content.interface";
import SearchWidget from "./searchWidget";

const resolverMap: any = {
  Query: {
    searchWidgets: (parent, args, { authData, dataSources }: IContext) => {
      return dataSources.contentConnector.getContent({
        content_type: "search_widget",
        ...args,
      });
    },
  },
  SearchWidget: {
    viewCount: async (
      searchWidget: SearchWidget,
      args,
      { authData, dataSources }: IContext
    ) => {
      return dataSources.analyticsAPI.getViewCount(
        searchWidget.url,
        process.env.GOOGLE_ANALYTICS_VIEW_ID
      );
    },
  },
};

export default resolverMap;
