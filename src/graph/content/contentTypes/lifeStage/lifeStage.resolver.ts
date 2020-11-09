import { IContext } from "../../../context/context.interface";
import { IContent } from "../../content.interface";

const resolverMap: any = {
  Query: {
    lifeStages: (parent, args, { authData, dataSources, forceRefresh }: IContext) => {
      return dataSources.contentConnector.getContent({ content_type: "life_stage" });
    }
  },
  LifeStageContent: {
    qualifiedUrl: (parent: IContent, args, { authData, dataSources }: IContext) => {
      return parent.getUrl();
    }
  }
};

export default resolverMap;
