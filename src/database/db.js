import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

export class DB {
  static #db;

  constructor(verbose = false) {
    this.verbose = verbose;
    this.sqlite3 = this.verbose ? sqlite3.verbose() : sqlite3;
  }

  async #connect() {
    DB.#db = await open({
      filename: ':memory:',
      driver: this.sqlite3.Database,
    });
    if (this.verbose) {
      console.log('Connected to the in-memory SQLite database');
    }
  }

  static async getInstance(verbose = false) {
    if (!DB.#db) {
      await new DB(verbose).#connect();
    }
    return DB.#db;
  }
}
