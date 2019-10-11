import { IContext } from "../context/context.interface";
import { IContent } from "./content.interface";
import albumResolver from "./contentTypes/album/album.resolver";
import articleResolver from "./contentTypes/article/article.resolver";
import authorResolver from "./contentTypes/author/author.resolver";
import contentBlockResolver from "./contentTypes/contentBlock/contentBlock.resolver";
import episodeResolver from "./contentTypes/episode/episode.resolver";
import lifeStageResolver from "./contentTypes/lifeStage/lifeStage.resolver";
import messageResolver from "./contentTypes/message/message.resolver";
import pageResolver from "./contentTypes/page/page.resolver";
import podcastResolver from "./contentTypes/podcast/podcast.resolver";
import promoResolver from "./contentTypes/promo/promo.resolver";
import seriesResolver from "./contentTypes/series/series.resolver";
import songResolver from "./contentTypes/song/song.resolver";
import videoResolver from "./contentTypes/video/video.resolver";
import locationResolver from "./contentTypes/location/location.resolver";

import camelCase from "camelcase";
import { merge } from "lodash";

const resolverMap: any = {
  Media: {
    __resolveType(content: IContent, context, info) {
      return camelCase(content.contentType, { pascalCase: true });
    },
    qualifiedUrl: (parent: IContent, args, { authData, dataSources }: IContext) => {
      return parent.getQualifiedUrl();
    }
  },
  Content: {
    __resolveType(content: IContent, context, info) {
      return camelCase(content.contentType, { pascalCase: true });
    }
  }
};

export default merge(
  resolverMap,
  albumResolver,
  articleResolver,
  authorResolver,
  contentBlockResolver,
  episodeResolver,
  lifeStageResolver,
  messageResolver,
  pageResolver,
  podcastResolver,
  promoResolver,
  seriesResolver,
  songResolver,
  videoResolver,
  locationResolver
);
