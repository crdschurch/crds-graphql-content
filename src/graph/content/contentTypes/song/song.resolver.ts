import { IContext } from "../../../context/context.interface";
import { IContent } from "../../content.interface";

const resolverMap: any = {
    Song: {
        qualifiedUrl: (song: IContent, args, { authData, dataSources }: IContext) => {
            return song.getQualifiedUrl();
        }
    }
};

export default resolverMap;
