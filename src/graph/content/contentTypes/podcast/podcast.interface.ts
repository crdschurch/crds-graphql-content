export interface IPodcastAPI {
  getPlayCount(id: string): Promise<number>;
}
