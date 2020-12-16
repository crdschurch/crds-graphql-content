import { IAnalyticsAPI } from "./analytics.interface";
const { google } = require("googleapis");
import { RESTDataSource, RequestOptions } from "apollo-datasource-rest";
import DataLoader from "dataloader";

export class AnalyticsAPI extends RESTDataSource implements IAnalyticsAPI {
  private jwt: any;
  private analyticsDataLoader: DataLoader<{}, number>;
  constructor() {
    super();
    this.analyticsDataLoader = new DataLoader(async (queries: any[]) => {
      var results = await Promise.all(
        queries.map((query) =>
          this.getViewCountQuery(query.url, query.viewId)
        )
      );

      return queries.map((query) => {
        var response: any = results.find(
          (r: any) => r.data.query.filters == `ga:pagePath=~${query.url}`
        );
        return response.data.rows && response.data.rows[0][0];
      });
    });
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

  public getViewCount(url: string, viewId: string): Promise<number> {
    return this.analyticsDataLoader.load({ url: url, viewId: viewId });
  }

  private async getViewCountQuery(
    url: string,
    viewId: string
  ): Promise<number> {
    await this.willSendRequest();
    return google.analytics("v3").data.ga.get({
      auth: this.jwt,
      ids: "ga:" + viewId,
      "start-date": "2005-01-01",
      "end-date": "today",
      metrics: "ga:pageviews",
      filters: `ga:pagePath=~${url}`,
      batch: true,
    });
  }
}
