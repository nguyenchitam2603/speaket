import * as Mongoose from 'mongoose';

import { IDbClient } from '../../interfaces';

export class MongooseDbClient implements IDbClient {
  public connection: Mongoose.Connection;

  constructor(private connectionString: string, private connectionOptions: any) {
    (<any>Mongoose.Promise) = global.Promise;
    this.connection = null;
  }

  public connect() {
    if (!this.connection) {
      this.connection = Mongoose.createConnection(this.connectionString, this.connectionOptions);
      this.connection.on('error', console.error.bind(console, 'Database error: '));
      this.connection.on('connected', () => console.log('Connected database'));
      this.connection.on('disconnected', () => console.log('Disconnected database'));
    }
  }

  public disconnect() {
    if (this.connection) {
      this.connection.close();
    }
  }
}
