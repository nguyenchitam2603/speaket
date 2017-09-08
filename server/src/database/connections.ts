import { DbClientFactory } from './factories';
import { DbClientType } from './constants';

// Internal connection
let internalDbClient = DbClientFactory.createDbClient(DbClientType.Mongoose);
internalDbClient.connect();
export let internalConnection = internalDbClient.connection;
