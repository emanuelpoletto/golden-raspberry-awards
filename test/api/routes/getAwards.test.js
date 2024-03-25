import {
  describe,
  it,
  before,
  beforeEach,
  after,
} from 'node:test';
import assert from 'node:assert';
import getAwardsRoute from '../../../src/api/routes/getAwards.js';
import { DEFAULT_LIMIT } from '../../../src/constants.js';
import initDb from '../../../src/database/initDb.js';
import seedDb from '../../../src/database/seedDb.js';
import mockDataRows from '../../mocks/dataRows.mock.js';
import createSchema from '../../../src/database/createSchema.js';

const ROUTE_PATH = '/awards';

const mockReq = {
  url: ROUTE_PATH,
};

const mockRes = {
  setHeader(...args) {
    this.headers = args;
    return args;
  },
  end(result) {
    this.response = result;
    return result;
  },
};

describe('getAwardsRoute', () => {
  let db;

  before(async () => {
    db = await initDb();
    await db.open();
    await createSchema(db);
    await seedDb({ db, dataRows: mockDataRows });
  });

  beforeEach(() => {
    mockReq.url = ROUTE_PATH;
    mockRes.headers = undefined;
    mockRes.response = undefined;
  });

  after(async () => {
    await db.close();
  });

  it('should return JSON response with default length', async () => {
    await getAwardsRoute(mockReq, mockRes);
    const response = JSON.parse(mockRes.response);

    assert.ok(response);
    assert.equal(response.length, DEFAULT_LIMIT);
  });

  it('should return a given number of records when limit is set', async () => {
    const limit = 5;
    mockReq.url = `${ROUTE_PATH}?limit=${limit}`;

    await getAwardsRoute(mockReq, mockRes);
    const response = JSON.parse(mockRes.response);

    assert.ok(response);
    assert.equal(response.length, limit);
  });

  it('should return an array of objects', async () => {
    await getAwardsRoute(mockReq, mockRes);
    const response = JSON.parse(mockRes.response);

    assert.ok(Array.isArray(response));
    assert.ok(response.every((item) => typeof item === 'object'));
  });

  it('should set the Content-Type header to application/json', async () => {
    await getAwardsRoute(mockReq, mockRes);

    assert.equal(mockRes.headers[0], 'Content-Type');
    assert.equal(mockRes.headers[1], 'application/json');
  });

  it('should return default limit if the limit query parameter is not a number', async () => {
    mockReq.url = `${ROUTE_PATH}?limit=not-a-number`;

    await getAwardsRoute(mockReq, mockRes);
    const response = JSON.parse(mockRes.response);

    assert.ok(response);
    assert.equal(response.length, DEFAULT_LIMIT);
  });
});
