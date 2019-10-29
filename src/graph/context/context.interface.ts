import { IContentConnector } from "../content/content.interface";
import { IAuthData } from "../auth/auth.interface";

export interface IContext {
  authData: IAuthData;
  dataSources: IDataSources;
  forceRefresh: boolean
}

export interface IDataSources {
  contentConnector: IContentConnector;
}
