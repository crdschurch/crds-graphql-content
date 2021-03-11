import { IContext } from "../../../context/context.interface";
import EngagementBlock from "./engagementBlock";

const resolverMap: any = {
  Engagement: {
    title: async (engagement, args, { authData, dataSources }: IContext) => {
      var engagementBlocks = (await dataSources.contentConnector.getContent({
        content_type: "engagement_block",
        enagement_id: engagement.id,
      })) as EngagementBlock[];
      return engagementBlocks?.find(() => true)?.title;
    },
    contentType: async (
      engagement,
      args,
      { authData, dataSources }: IContext
    ) => {
      var engagementBlocks = (await dataSources.contentConnector.getContent({
        content_type: "engagement_block",
        enagement_id: engagement.id,
      })) as EngagementBlock[];
      return engagementBlocks?.find(() => true)?.contentType;
    },
    description: async (
      engagement,
      args,
      { authData, dataSources }: IContext
    ) => {
      var engagementBlocks = (await dataSources.contentConnector.getContent({
        content_type: "engagement_block",
        enagement_id: engagement.id,
      })) as EngagementBlock[];
      return engagementBlocks?.find(() => true)?.description;
    },
    targetUrl: async (
      engagement,
      args,
      { authData, dataSources }: IContext
    ) => {
      var engagementBlocks = (await dataSources.contentConnector.getContent({
        content_type: "engagement_block",
        enagement_id: engagement.id,
      })) as EngagementBlock[];
      return engagementBlocks?.find(() => true)?.targetUrl;
    },
    tooltipEarnedContent: async (
      engagement,
      args,
      { authData, dataSources }: IContext
    ) => {
      var engagementBlocks = (await dataSources.contentConnector.getContent({
        content_type: "engagement_block",
        enagement_id: engagement.id,
      })) as EngagementBlock[];
      return engagementBlocks?.find(() => true)?.tooltipEarnedContent;
    },
    tooltipUnearnedContent: async (
      engagement,
      args,
      { authData, dataSources }: IContext
    ) => {
      var engagementBlocks = (await dataSources.contentConnector.getContent({
        content_type: "engagement_block",
        enagement_id: engagement.id,
      })) as EngagementBlock[];
      return engagementBlocks?.find(() => true)?.tooltipUnearnedContent;
    },
    disabled: async (engagement, args, { authData, dataSources }: IContext) => {
      var engagementBlocks = (await dataSources.contentConnector.getContent({
        content_type: "engagement_block",
        enagement_id: engagement.id,
      })) as EngagementBlock[];
      return engagementBlocks?.find(() => true)?.disabled;
    },
  },
};

export default resolverMap;
