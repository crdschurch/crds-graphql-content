# crds-graphql-content

Content GraphQL service for returning data from our CMS. This will be consumed ONLY by the graphql gateway. Do not make any client calls directly to this service. They should all flow through the gateway.

## Quick Start
It is recommended that you first become familiar with graphql theory and implementation here (https://www.apollographql.com/docs/). This project uses Apollo for creating the GraphQL server on top of Express. 

1. Clone the repo: `git clone https://github.com/crdschurch/crds-graphql-content`
2. Get Vault and New Relic env vars
3. Run `npm i` to add dependencies
4. Run the server
    - Option 1:
      * Run `npm run watch` to compile the ts to js in the `/dist` folder and watch for file updates.
      * Launch the server locally by either launching via the debugger in VSCode against Node (preferred method because you get easy debugging and breakpoints in vs         code via the mapped /src/*.ts to /dist/*.js) or by running `npm run start`.
    - Option 2:
      * Just use F5 in vscode to run. It will automatically build everytime you restart the server
5. You should now be able to visit localhost:8000 and see the included UI for ApolloServer. 
6. To execute any query or mutation you will need a valid Auth Token. To retrieve this you can login at int.crossroads.net and copy the value for the intsessionId      cookie in the browser. Paste your auth token as a header - found in the bottom left of the UI as a JSON object. `{"authorization": "${yourAuthTokenHere}"}. `
7. Run a test query `{
                     sites {
                        id
                        name
                        }
                    }`
8. You should see a list of sites with their id and name. If you receive a "context creation failed" error message then your auth token was expired or invalid.         Double check the header you set.

#### Deployment
Deployment is automatic via Team City in development, release, and master branches. They live under API & Back-End > GraphQL-API and get deployed to Kubernetes (https://k8s-int.crossroads.net/#!/service/api/crds-graphql-content?namespace=api).

#### Logging
Logging is handled by the graphql gateway.

#### Environment variables
.envrc Sample: 
export VAULT_ROLE_ID=
export VAULT_SECRET_ID=
export CRDS_ENV=local
export NEW_RELIC_LICENSE_KEY=

The rest of the environment variables are being loaded from vault (https://vault.crossroads.net/) using the crds-vault-node package (https://github.com/crdschurch/crds-vault-node) with the corresponding ENV listed above. We are loading both the `common` and `graphql` secrets.

#### Create a new model
To create a new model for querying and mutating, you will create a folder inside of `src/graph/`. I will use the `sites` folder as an example here. If you should be able to query your new model by itself, then `sites` is a good template to follow. Compare `get sites` or `get site by ID` VS `get groups a user belongs to`. To retrieve a group a user belongs to, you don't actually need to ever fetch groups by themselves so a `groups` resolver and connector would be unnecessary (You would put the resolver and connector functions in the `users` classes for that). But in the instance of `get all sites`, it is necessary to specifically have a GraphQL query for `sites` meaning you do need a connector and a resolver. It may be easiest to copy the `sites` folder and rename the files and their contents accordingly to match your new model. 

Once you have your new model and folder along with all of it's files, you will need to bind the connector to the container (we use inversifyJS here). To do this, add the connector binding to the `src/ioc/inversify.config.ts` file. You will also need to declare a symbol for this connector in the `src/ioc/types` folder for future use with dependency injection. Once this is completed you can inject the new connector in the constructor of the `GraphqlServer` in `src/graphql.ts`. Once injected, you can include it in the constructor of the ApolloServer in `dataSources`. This will allow that connector to be available in your resolvers in the `context` (`context.dataSources.${modelConnector}`) object that is passed in. This allows for easy unit tests by being able to mock the connector off of your interface and then directly injecting it into `dataSources` for your ApolloTestServer instead of injecting the actual concrete implementation. 

The resolver and schema for the new model will also need to be made available to the ApolloServer by importing it to `src/resolvers.ts` and `src/schema.ts` respectively.

##Data Sources
Try to stick to datasources that implement Facebook's DataLoader already. Apollo has a RESTDataSource that we can extend that will automatically dedupe outgoing network (per incoming request) calls for us. There is also a community mongo package that does the same thing. This allows us to have the same call in different field resolvers and only make that call once. This simplifies the resolvers implementation incredibly by having the underlying datasources deduping requests.  

Because we want to have outgoing calls deduped and cached per incoming request, this means we want to create new instances of the datasources for every incoming call. I have been following the pattern that we will do any service initialization (like getting an auth token) in source configuration under the `sources` folder. A concrete example of this is getting an MP client token so we can hit the MP Rest API. We do not want to make a call to get this token for every incoming request, so instead we handle this in an `MP.ts` file under the `sources` folder. We can reuse the obtained client token and keep that process abstracted from the connectors that are instantiated for each incoming request. Notice that in initializing the datasources in the graphql.ts file we call `new ExampleAPI()`. This gets called on every incoming request.

### Unit Testing
We are using jest.js (https://jestjs.io/docs/en/getting-started) for unit tests. I have set the pattern to create and export your mockConnector at the top of every spec file with the unit tests to follow. You will need to create a new ApolloServer and an ApolloTestClient in each unit test. See `src/graph/sites/sites.spec.ts` for an example. 

## License

This project is licensed under the [3-Clause BSD License](https://opensource.org/licenses/BSD-3-Clause).
