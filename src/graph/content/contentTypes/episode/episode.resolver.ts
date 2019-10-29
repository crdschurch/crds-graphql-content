import { IContext } from "../../../context/context.interface";
import { IContent } from "../../content.interface";

const resolverMap: any = {
    Episode: {
        qualifiedUrl: (episode: IContent, args, { authData, dataSources }: IContext) => {
            return episode.getQualifiedUrl();
        }
    }
};

export default resolverMap;
