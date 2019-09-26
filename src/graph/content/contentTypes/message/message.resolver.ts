import { IContext } from "../../../context/context.interface";
import { IContent } from "../../content.interface";

const resolverMap: any = {
    Message: {
        qualifiedUrl: (message: IContent, args, { authData, dataSources }: IContext) => {
            return message.getQualifiedUrl();
        }
    }
};

export default resolverMap;
