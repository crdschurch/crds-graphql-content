import { IContext } from "../../../context/context.interface";

const resolverMap = {
  Site: {
    address: async (parent, args, { authData, dataSources }: IContext) => {
      //find way to check if exists in contentful before doing these
      const location = await dataSources.contentConnector.getSite(parent.id);
      return location.address;
    },
    serviceTimes: async (parent, args, { authData, dataSources }: IContext) => {
      const location = await dataSources.contentConnector.getSite(parent.id);
      return location.serviceTimes;
    },
    openHours: async (parent, args, { authData, dataSources }: IContext) => {
      const location = await dataSources.contentConnector.getSite(parent.id);
      return location.openHours;
    },
    mapImageUrl: async (parent, args, { authData, dataSources }: IContext) => {
      const location = await dataSources.contentConnector.getSite(parent.id);
      return location.mapImageUrl;
    },
    mapUrl: async (parent, args, { authData, dataSources }: IContext) => {
      const location = await dataSources.contentConnector.getSite(parent.id);
      return location.mapUrl;
    }
  }
};

export default resolverMap;
