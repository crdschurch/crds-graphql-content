import { injectable, inject } from "inversify";
import { Types } from "../../ioc/types";
import {
  IContentConnector,
  IContentService,
  IContent,
  IContentQuery,
} from "../content/content.interface";
import { ContentFactory } from "./content.factory";
import Site from "./contentTypes/location/location";
import DataLoader from "dataloader";
import { Series } from "./contentTypes";

@injectable()
export class ContentConnector implements IContentConnector {
  private siteLoader: DataLoader<{}, Site>;
  private seriesLoader: DataLoader<{}, Series>;
  private contentLoader: DataLoader<{}, IContent[]>;

  constructor(
    @inject(Types.ContentService) private contentService: IContentService
  ) {
    this.siteLoader = new DataLoader((ids: string[]) =>
      this.contentService
        .getContent({
          content_type: "location",
          "site_id[in]": ids.join(","),
        })
        .then((results) => {
          var sites = results[0].entries.map((entry) =>
            ContentFactory.instantiate(entry)
          );
          return ids.map((id) => sites.find((site) => site.site_id == id));
        })
    );
    this.seriesLoader = new DataLoader(
      (ids: string[]) =>
        this.contentService
          .getContent({
            content_type: "series",
            "videos.sys.id[in]": ids.join(","),
          })
          .then((results) => {
            var seriess = results[0].entries.map((entry) =>
              ContentFactory.instantiate(entry)
            );
            return ids.map((key) => {
              var series = seriess.find((series) =>
                series.messages.find((m) => m && m.id == key)
              );
              return series;
            });
          }),
      { maxBatchSize: 100 }
    );
    this.contentLoader = new DataLoader((filters: any[]) => {
      var uniqueContentTypes = [
        ...new Set(filters.map((item) => item.content_type)),
      ];
      var aggregatedFilters = uniqueContentTypes.map((type) => {
        var ids = filters
          .filter((f) => f.content_type == type)
          .flatMap((f) => f.id)
          .filter((id) => id);

        return {
          content_type: type,
          ...(ids.length && { id: ids }),
        };
      });

      return this.contentService
        .getContent(aggregatedFilters)
        .then((results) => {
          return filters
            .map((key) => {
              return results.find(
                (r) => r.filters.id == key.id || r.filters == key
              );
            })
            .map(
              (result) =>
                result &&
                result.entries.map((entry) => ContentFactory.instantiate(entry))
            );
        });
    });
  }

  public getContent(filters: IContentQuery): Promise<IContent[]> {
    return this.contentLoader.load(filters);
  }

  public async getSite(id: number): Promise<Site> {
    const site = await this.siteLoader.load(id);
    ``;
    return <Site>site;
  }

  public async getSeries(videoId: string): Promise<Series> {
    return this.seriesLoader.load(videoId);
  }
}
