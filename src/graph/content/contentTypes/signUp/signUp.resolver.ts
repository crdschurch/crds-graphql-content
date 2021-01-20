import { IContext } from "../../../context/context.interface";
import { IContent } from "../../content.interface";
import SignUp from "./signUp";

const resolverMap: any = {
  Query: {
    signUps: (parent, args, { authData, dataSources }: IContext) => {
      return dataSources.contentConnector.getContent({
        content_type: "sign_up_form",
        ...args,
      });
    },
  },
};

export default resolverMap;
