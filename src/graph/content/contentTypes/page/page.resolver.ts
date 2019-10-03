import { IContext } from "../../../context/context.interface";
import { IContent } from "../../content.interface";

const resolverMap: any = {
    Page: {
        qualifiedUrl: (page: IContent, args, { authData, dataSources }: IContext) => {
            return page.getQualifiedUrl();
        }
    }
};

export default resolverMap;
