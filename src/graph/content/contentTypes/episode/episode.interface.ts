export interface IEpisodeAPI {
  getPlayCount(id: string): Promise<number>;
}
