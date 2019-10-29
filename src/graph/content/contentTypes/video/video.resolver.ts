import { IContext } from "../../../context/context.interface";
import { IContent } from "../../content.interface";

const resolverMap: any = {
    Video: {
        qualifiedUrl: (video: IContent, args, { authData, dataSources }: IContext) => {
            return video.getQualifiedUrl();
        }
    }
};

export default resolverMap;
