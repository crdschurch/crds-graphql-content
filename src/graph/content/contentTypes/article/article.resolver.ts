import { IContext } from "../../../context/context.interface";
import { IContent } from "../../content.interface";

const resolverMap: any = {
  Query: {
    articles: (parent, args, { authData, dataSources }: IContext) => {
      return dataSources.contentConnector.getContent({
        content_type: "article",
        ...args,
      });
    },
  },
  Article: {
    qualifiedUrl: (
      article: IContent,
      args,
      { authData, dataSources }: IContext
    ) => {
      return article.getQualifiedUrl();
    },
    viewCount: async (
      page: IContent,
      args,
      { authData, dataSources }: IContext
    ) => {
      return dataSources.analyticsAPI.getViewCount(
        await page.slug,
        process.env.GOOGLE_ANALYTICS_VIEW_ID
      );
    },
  },
};

export default resolverMap;
