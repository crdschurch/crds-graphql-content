export interface IMusicAPI {
  getPlayCount(
    albumId: string,
    songId?: string,
    songTitle?: string
  ): Promise<number>;
}
