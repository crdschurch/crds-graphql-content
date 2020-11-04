import { Series } from "..";
import { IContext } from "../../../context/context.interface";
import { IContent } from "../../content.interface";

const resolverMap: any = {
  Query: {
    series: (parent, args, { authData, dataSources }: IContext) => {
      return dataSources.contentConnector.getContent({
        content_type: "series",
        ...args,
      });
    },
  },
  Series: {
    url: (
      series: IContent,
      args,
      { authData, dataSources }: IContext
    ) => {
      return `${process.env.CRDS_MEDIA_ENDPOINT}/${series.contentType}/${series.slug}`;
    },
    viewCount: (
      series: IContent,
      args,
      { authData, dataSources }: IContext
    ) => {
      return dataSources.analyticsAPI.getViewCount(
        series.slug,
        process.env.GOOGLE_ANALYTICS_VIEW_ID
      );
    },
  },
};

export default resolverMap;
