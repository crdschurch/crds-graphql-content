import { IContext } from "../../../context/context.interface";
import { IContent } from "../../content.interface";

const resolverMap: any = {
  Query: {
    onsiteGroups: (parent, args, { authData, dataSources, forceRefresh }: IContext) => {
      console.log('test');
      return dataSources.contentConnector.getContent({ content_type: "onsite_group" });
    }
  }
};

export default resolverMap;
