import { CosmosClient } from "@azure/cosmos";

// Set Database name and container name with unique timestamp
const databaseName = `url-shortener`;
const containerName = `mappings`;
const partitionKeyPath = ["/urls"];

export default (async () => {
  const cosmosClient = new CosmosClient({
    endpoint: process.env.COSMOS_ENDPOINT,
    key: process.env.COSMOS_KEY,
  });
  const { database } = await cosmosClient.databases.createIfNotExists({
    id: databaseName,
  });
  const { container } = await database.containers.createIfNotExists({
    id: containerName,
    partitionKey: {
      paths: partitionKeyPath,
    },
  });
  return container;
})();
