import { IContext } from "../../../context/context.interface";
import { IContent } from "../../content.interface";

const resolverMap: any = {
    Series: {
        qualifiedUrl: (series: IContent, args, { authData, dataSources }: IContext) => {
            return series.getQualifiedUrl();
        }
    }
};

export default resolverMap;
