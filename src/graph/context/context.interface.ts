import { IContentConnector } from "../content/content.interface";
import { IAuthData } from "../auth/auth.interface";

export interface IContext {
  authData: IAuthData;
  dataSources: IDataSources;
}

export interface IDataSources {
  contentConnector: IContentConnector;
}
