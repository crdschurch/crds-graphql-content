import { injectable, inject } from "inversify";
import { Types } from "../../ioc/types";
import { IContentConnector, IContentService, IContent } from "../content/content.interface";
import Series from "./contentTypes/series/series";
import { ContentFactory } from "./content.factory";
import Site from "./contentTypes/location/location";
import DataLoader from "dataloader";

@injectable()
export class ContentConnector implements IContentConnector {
  private siteLoader: DataLoader<{}, IContent>;

  constructor(@inject(Types.ContentService) private contentService: IContentService) {
    this.siteLoader = new DataLoader((ids: string[])=> this.getContent({ content_type: "location", "site_id[in]": ids.join(',') }));
  }

  public getContent(filters): Promise<IContent[]> {
    return this.contentService.getContent(filters).then(entries => {
      return entries.map(entry => ContentFactory.instantiate(entry));
    });
  }

  public async getSite(id: number): Promise<Site> {
    const site = await this.siteLoader.load(id);
    return <Site>site;
  }
}
