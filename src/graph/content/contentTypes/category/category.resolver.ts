import { IContext } from "../../../context/context.interface";
import { IContent } from "../../content.interface";

const resolverMap: any = {
  Query: {
    categories: (parent, args, { authData, dataSources }: IContext) => {
      return dataSources.contentConnector.getContent({
        content_type: "category",
        ...args,
      });
    },
  },
  category: {
    qualifiedUrl: (
      category: IContent,
      args,
      { authData, dataSources }: IContext
    ) => {
      return category.getQualifiedUrl();
    },
    viewCount: async (
      category: IContent,
      args,
      { authData, dataSources }: IContext
    ) => {
      return dataSources.analyticsAPI.getViewCount(
        await category.getQualifiedUrl(),
        process.env.GOOGLE_ANALYTICS_VIEW_ID
      );
    },
  },
};

export default resolverMap;
