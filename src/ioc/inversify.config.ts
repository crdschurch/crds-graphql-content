import { Container } from "inversify";
import "reflect-metadata";
import { GraphqlServer } from "../graphql";
import { Server } from "../server";
import { Types } from "./types";
import { ContentConnector } from "../graph/content/content.connector";
import { ContentService } from "../sources/content";

var container = new Container();

container.bind<Server>(Types.Server).to(Server);
container.bind<GraphqlServer>(Types.GraphQLServer).to(GraphqlServer).inSingletonScope();
container.bind<ContentConnector>(Types.ContentConnector).to(ContentConnector);
container.bind<ContentService>(Types.ContentService).to(ContentService);

export default container;
