import { IContext } from "../../../context/context.interface";
import EngagementBlock from "./engagementBlock";

const resolverMap: any = {
  Query: {
    engagements: async (
      _user,
      _args,
      { authData, dataSources }: IContext
    ): Promise<EngagementBlock[]> => {
      var engagements = (await dataSources.contentConnector.getContent({
        content_type: "engagement_block",
        ..._args,
      })) as EngagementBlock[];
      return engagements;
    },
    badges: async (
      _user,
      _args,
      { authData, dataSources }: IContext
    ): Promise<EngagementBlock[]> => {
      var engagements = (await dataSources.contentConnector.getContent({
        content_type: "engagement_block",
        ..._args,
        ...{ ..._args, type: "badge" },
      })) as EngagementBlock[];
      return engagements;
    },
    activities: async (
      _user,
      _args,
      { authData, dataSources }: IContext
    ): Promise<EngagementBlock[]> => {
      var engagements = (await dataSources.contentConnector.getContent({
        content_type: "engagement_block",
        ...{ ..._args, type: "activity" },
      })) as EngagementBlock[];
      return engagements;
    },
  },
  User: {
    engagements: async (
      _user,
      _args,
      { authData, dataSources }: IContext
    ): Promise<EngagementBlock[]> => {
      var engagements = (await dataSources.contentConnector.getContent({
        content_type: "engagement_block",
        ..._args,
      })) as EngagementBlock[];
      return engagements;
    },
    badges: async (
      _user,
      _args,
      { authData, dataSources }: IContext
    ): Promise<EngagementBlock[]> => {
      var engagements = (await dataSources.contentConnector.getContent({
        content_type: "engagement_block",
        ..._args,
        ...{ ..._args, type: "badge" },
      })) as EngagementBlock[];
      return engagements;
    },
    activities: async (
      _user,
      _args,
      { authData, dataSources }: IContext
    ): Promise<EngagementBlock[]> => {
      var engagements = (await dataSources.contentConnector.getContent({
        content_type: "engagement_block",
        ...{ ..._args, type: "activity" },
      })) as EngagementBlock[];
      return engagements;
    },
  },
  Engagement: {},
};

export default resolverMap;
