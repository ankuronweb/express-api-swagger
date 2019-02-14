import chai from 'chai';
import chaiHttp from 'chai-http';
import { expect } from 'chai';

import app from '../src/server';

chai.should();
chai.use(chaiHttp);

describe('GET /api/health', () => {
  it('Health returns OK', () => {
    return chai.request(app)
      .get('/api/health')
      .then((res) => {
        expect(res).to.have.status(200);
      });
  });
  after(() => app.stop());
});
