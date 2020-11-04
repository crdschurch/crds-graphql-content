import { Series } from "./contentTypes";
import Site from "./contentTypes/location/location";
export interface IContent {
  title: string;
  contentType: string;
  category: string;
  tags: string[];
  description: string;
  slug: string;
  likes: number;
  distributionChannels: string[];
  id: string;
  imageUrl: string;
  getUrl(): Promise<string>;
}

export interface IContentConnector {
  getContent(filters): Promise<IContent[]>;
  getSite(id: number): Promise<Site>;
  getSeries(videoId: string): Promise<Series>;
}

export interface IContentService {
  getContent(filters: any): Promise<any>;
}


export interface IContentQuery {
  content_type: string;
  filters: object;
}
