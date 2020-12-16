export interface IAnalyticsAPI {
  getViewCount(url: string, viewId?: string): Promise<number>;
}
