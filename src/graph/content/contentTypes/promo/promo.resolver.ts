import { IContext } from "../../../context/context.interface";
import { IContent } from "../../content.interface";

const resolverMap: any = {
    Query: {
        promos: (parent, args, { authData, dataSources }: IContext) => {
            return dataSources.contentConnector.getContent({ 'content_type': 'promo' });
        }
    },
    Promo: {
        qualifiedUrl: (promo: IContent, args, { authData, dataSources }: IContext) => {
            return promo.getQualifiedUrl();
        }
    }
};

export default resolverMap;
