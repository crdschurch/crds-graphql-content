export interface ISocialMediaMongo {
  getSocialMediaPosts(
    types?: string[],
    usernames?: string[],
    limit?: number,
    offset?: number
  ): Promise<any>;
}
