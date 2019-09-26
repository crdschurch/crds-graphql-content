import { IContext } from "../../../context/context.interface";
import { IContent } from "../../content.interface";

const resolverMap: any = {
    Author: {
        qualifiedUrl: (author: IContent, args, { authData, dataSources }: IContext) => {
            return author.getQualifiedUrl();
        }
    }
};

export default resolverMap;
