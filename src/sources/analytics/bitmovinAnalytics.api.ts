import { RESTDataSource, RequestOptions } from "apollo-datasource-rest";
import DataLoader from "dataloader";

export class BitmovinAnalyticsAPI extends RESTDataSource {
  private analyticsLoader: DataLoader<{}, number>;
  constructor() {
    super();
    this.baseURL = process.env.BITMOVIN_API_ENDPOINT;
    this.analyticsLoader = new DataLoader(async (ids: string[]) => {
      const fromDate = new Date("1/1/2020");
      const toDate = new Date();
      var response = await this.post("analytics/queries/count", {
        filters: [
          {
            name: "VIDEO_STARTUPTIME",
            operator: "GT",
            value: 0,
          },
        ],
        groupBy: ["VIDEO_ID", "VIDEO_TITLE"],
        orderBy: [
          {
            name: "FUNCTION",
            order: "DESC",
          },
          {
            name: "VIDEO_ID",
            order: "ASC",
          },
        ],
        dimension: "IMPRESSION_ID",
        start: fromDate.toISOString(),
        end: toDate.toISOString(),
        licenseKey: process.env.BITMOVIN_ANALYTICS_LICENSE,
        cursor: 90,
      });
      var rows = response.data.result.rows;
      return ids.map((key) => {
        var row = rows.find((video) => video[1] == key);
        return row && row[2];
      });
    });
  }

  public async willSendRequest(request: RequestOptions) {
    request.headers.set("x-api-key", process.env.BITMOVIN_API_KEY);
  }

  public async getViewCount(title: string): Promise<number> {
    return this.analyticsLoader.load(title);
  }
}
