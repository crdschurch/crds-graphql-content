import { createClient, ContentfulClientApi } from "contentful";
import { injectable } from "inversify";
import { IContentService } from "../graph/content/content.interface";

@injectable()
export class ContentService implements IContentService {
  private client: ContentfulClientApi;

  constructor() {
    this.client = createClient({
      accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
      space: process.env.CONTENTFUL_SPACE_ID,
      environment: process.env.CONTENTFUL_ENV,
    });
  }

  private getEntries(filters: object, entries, skip): Promise<any> {
    var params = {
      skip: skip,
      limit: 1000,
      include: 10,
      ...filters,
    };

    return this.client
      .getEntries(params)
      .then((response) => {
        entries = [...entries, ...response.items];
        if (response.items.length !== 1000) return entries;
        return this.getEntries(filters, entries, skip + 1000);
      })
      .catch((ex) => {
        throw ex;
      });
  }

  public async getContent(filters: any): Promise<any> {
    if (!Array.isArray(filters)) filters = [filters];

    return await Promise.all(filters.map(async (filterGroup) => {
      const newFilters = {};
      Object.keys(filterGroup).forEach((key) => {
        var newKey = key;
        if (key != "content_type") newKey = "fields." + newKey;
        newKey = newKey.replace("fields.id", "sys.id");
        if (Array.isArray(filterGroup[key])) {
          newKey = `${newKey}[in]`;
          filterGroup[key] = filterGroup[key].join(",");
        }
        newFilters[newKey] = filterGroup[key];
      });
      var entries = await this.getEntries(newFilters, [], 0);
      return {
        filters: filterGroup,
        entries: entries,
      };
    }));
  }
}
