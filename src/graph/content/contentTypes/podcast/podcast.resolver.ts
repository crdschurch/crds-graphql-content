import { IContext } from "../../../context/context.interface";
import { IContent } from "../../content.interface";

const resolverMap: any = {
    Podcast: {
        qualifiedUrl: (podcast: IContent, args, { authData, dataSources }: IContext) => {
            return podcast.getQualifiedUrl();
        }
    }
};

export default resolverMap;
