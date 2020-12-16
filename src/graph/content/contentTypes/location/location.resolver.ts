import { IContext } from "../../../context/context.interface";
import Site from "../../contentTypes/location/location";
import { IContent } from "../../content.interface";

async function getSiteContent(site, dataSources): Promise<Site | null> {
  if (!site.isPhysicalLocation) return null;
  return await dataSources.contentConnector.getSite(site.id);
}

const resolverMap = {
  Site: {
    async __resolveReference(reference, { authData, dataSources }) {
      if (!reference.isPhysicalLocation) return null;
      return await dataSources.contentConnector.getSite(reference.id);
    },
  },
};

export default resolverMap;
