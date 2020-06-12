import { Types } from "../../ioc/types";
import container from "../../ioc/inversify.config";
import { IContext } from "../context/context.interface";


const SocialMediaResolver: any = {
  Query: {
    socialMediaPosts: (parent, args, { authData, dataSources }: IContext) => {
      return dataSources.socialMediaMongo.getSocialMediaPosts(args.types, args.usernames, args.limit, args.offset);
    },
  }
};

export default SocialMediaResolver;
