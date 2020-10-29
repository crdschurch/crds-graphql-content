import { IContentConnector } from "../content/content.interface";
import { IAuthData } from "../auth/auth.interface";
import { ISocialMediaMongo } from "../social-media/social-media.interface";
import { IAnalyticsAPI } from "../../sources/analytics/analytics.interface";
import { IMusicAPI } from "../../sources/music/music.interface";
import { BitmovinAnalyticsAPI } from "../../sources/analytics/bitmovinAnalytics.api";

export interface IContext {
  authData: IAuthData;
  dataSources: IDataSources;
  forceRefresh: boolean
}

export interface IDataSources {
  contentConnector: IContentConnector;
  socialMediaMongo: ISocialMediaMongo;
  analyticsAPI: IAnalyticsAPI;
  musicAPI: IMusicAPI;
  bitmovinAnalyticsAPI: BitmovinAnalyticsAPI;
}
