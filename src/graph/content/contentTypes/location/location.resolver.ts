import { IContext } from "../../../context/context.interface";
import Site from "../../contentTypes/location/location";

async function getSiteContent(site, dataSources): Promise<Site | null> {
  if(!site.isPhysicalLocation) return null;
  return await dataSources.contentConnector.getSite(site.id);
}

const resolverMap = {
  Site: {
    address: async (parent, args, { authData, dataSources }: IContext) => {
     const location = await getSiteContent(parent, dataSources);
      return location && location.address;
    },
    serviceTimes: async (parent, args, { authData, dataSources }: IContext) => {
      const location = await getSiteContent(parent, dataSources);
      return location && location.serviceTimes;
    },
    openHours: async (parent, args, { authData, dataSources }: IContext) => {
      const location = await getSiteContent(parent, dataSources);
      return location && location.openHours;
    },
    mapImageUrl: async (parent, args, { authData, dataSources }: IContext) => {
      const location = await getSiteContent(parent, dataSources);
      return location && location.mapImageUrl;
    },
    mapUrl: async (parent, args, { authData, dataSources }: IContext) => {
      const location = await getSiteContent(parent, dataSources);
      return location && location.mapUrl;
    },
    imageUrl: async (parent, args, { authData, dataSources }: IContext) => {
      const location = await getSiteContent(parent, dataSources);
      return location && location.imageUrl;
    },
  }
};

export default resolverMap;
