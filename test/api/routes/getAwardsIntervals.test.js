import {
  describe,
  it,
  before,
  beforeEach,
  after,
} from 'node:test';
import assert from 'node:assert';
import getAwardsIntervalsRoute from '../../../src/api/routes/getAwardsIntervals.js';
import initDb from '../../../src/database/initDb.js';
import seedDb from '../../../src/database/seedDb.js';
import mockDataRows from '../../mocks/dataRows.mock.js';
import createSchema from '../../../src/database/createSchema.js';

const ROUTE_PATH = '/awards/intervals';

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

describe('getAwardsIntervalsRoute', () => {
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

  it('should return JSON response', async () => {
    await getAwardsIntervalsRoute(mockReq, mockRes);
    const response = JSON.parse(mockRes.response);

    assert.ok(response);
  });

  it('should return an object with min and max properties', async () => {
    await getAwardsIntervalsRoute(mockReq, mockRes);
    const response = JSON.parse(mockRes.response);

    assert.ok(response.min);
    assert.ok(Array.isArray(response.min));
    assert.ok(response.max);
    assert.ok(Array.isArray(response.max));
  });

  it('should set the Content-Type header to application/json', async () => {
    await getAwardsIntervalsRoute(mockReq, mockRes);

    assert.equal(mockRes.headers[0], 'Content-Type');
    assert.equal(mockRes.headers[1], 'application/json');
  });

  it('should return correct min and max intervals', async () => {
    await getAwardsIntervalsRoute(mockReq, mockRes);
    const response = JSON.parse(mockRes.response);

    assert.deepEqual(response.min, [{
      producer: 'Joel Silver',
      interval: 1,
      previousWin: 1990,
      followingWin: 1991,
    }]);

    assert.deepEqual(response.max, [{
      producer: 'Matthew Vaughn',
      interval: 13,
      previousWin: 2002,
      followingWin: 2015,
    }]);
  });
});
