export interface ISocialMediaMongo {
  getSocialMediaPosts(
    sources?: string[],
    usernames?: string[],
    limit?: number,
    offset?: number
  ): Promise<any>;
}
