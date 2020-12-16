import { IContext } from "../../../context/context.interface";
import { IContent } from "../../content.interface";

const resolverMap: any = {
  Query: {
    perspectives: (parent, args, { authData, dataSources }: IContext) => {
      return dataSources.contentConnector.getContent({
        content_type: "perspective",
        ...args,
      });
    },
  },
  Perspective: {
    qualifiedUrl: (perspective: IContent, args, { authData, dataSources }: IContext) => {
      return perspective.getUrl();
    },
  },
};

export default resolverMap;
