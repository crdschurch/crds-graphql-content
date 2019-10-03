import { IContext } from "../../../context/context.interface";
import { IContent } from "../../content.interface";

const resolverMap: any = {
    Article: {
        qualifiedUrl: (article: IContent, args, { authData, dataSources }: IContext) => {
            return article.getQualifiedUrl();
        }
    }
};

export default resolverMap;
