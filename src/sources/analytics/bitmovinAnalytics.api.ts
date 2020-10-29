import Bitmovin from "bitmovin-javascript";
import { RESTDataSource, RequestOptions } from "apollo-datasource-rest";

export class BitmovinAnalyticsAPI extends RESTDataSource {
  constructor() {
    super();
  }

  public async getViewCount(title: string): Promise<number> {
    const bitmovin: any = Bitmovin({
      apiKey: process.env.BITMOVIN_API_KEY,
    });
    const queryBuilder = bitmovin.analytics.queries.builder;
    const fromDate = new Date();
    fromDate.setDate(1);
    const toDate = new Date();
    toDate.setDate(14);
    var result = await queryBuilder
      .count("IMPRESSION_ID")
      .between(fromDate, toDate)
      .query();
    return result;
  }
}
