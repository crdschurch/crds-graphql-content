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
    const fromDate = new Date('1/1/2010');
    const toDate = new Date();
    var result = await queryBuilder
      .count("IMPRESSION_ID")
      .between(fromDate, toDate)
      .filter('VIDEO_TITLE', 'EQ', title)
      .query();
    return result.rows.find(() => true).find(() => true);
  }
}
