import { IContext } from "../../../context/context.interface";
import { IContent } from "../../content.interface";

const resolverMap: any = {
    Album: {
        qualifiedUrl: (album: IContent, args, { authData, dataSources }: IContext) => {
            return album.getQualifiedUrl();
        }
    }
};

export default resolverMap;
