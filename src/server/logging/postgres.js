import Transport from 'winston-transport';
import db from '../db';

export default class PostgresTransport extends Transport {
  constructor(opts) {
    super(opts);
    const { table } = opts;
    this.table = table;
    this.insertQuery = `insert into ${table}(level, message) values($1, $2)`;
  }

  log = async (entry, callback) => {
    const { level, message } = entry;

    try {
      await db.query(this.insertQuery, [level, message]);
      callback();
    } catch (err) {
      callback(err);
    }
  };
}
