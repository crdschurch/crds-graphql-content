import { IAnalyticsAPI } from "./analytics.interface";
const { google } = require("googleapis");
import { RESTDataSource, RequestOptions } from "apollo-datasource-rest";

export class AnalyticsAPI extends RESTDataSource implements IAnalyticsAPI {
  private jwt: any;
  constructor() {
    super();
  }

  async willSendRequest() {
    this.jwt = new google.auth.JWT(
      process.env.GOOGLE_CLIENT_EMAIL,
      null,
      process.env.GOOGLE_PRIVATE_KEY,
      ["https://www.googleapis.com/auth/analytics.readonly"]
    );
    await this.jwt.authorize();
  }

  public async getViewCount(url: string, viewId: string): Promise<number> {
      await this.willSendRequest();
      var response = await google.analytics("v3").data.ga.get({
        auth: this.jwt,
        ids: "ga:" + viewId, 
        "start-date": "2005-01-01",
        "end-date": "today",
        metrics: "ga:pageviews",
        filters: `ga:pagePath=~${url}`,
      });
      
      return response.data.rows[0][0];
  }
}
