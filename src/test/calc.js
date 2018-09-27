import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server';

chai.should();

chai.use(chaiHttp);

describe('api', () => {
  const baseUri = '/api/calc';

  describe('calc', () => {
    describe('divide', () => {
      it('divides divisible by divisor (GET /api/calc/divide)', async () => {
        const [divisible, divisor] = [10, 2];
        const response = await chai
          .request(server)
          .get(`${baseUri}/divide?divisible=${divisible}&divisor=${divisor}`);

        response.should.have.status(200);
        response.should.be.json();
        response.body.should.be.a('object');
        response.body.result.should.equal(divisible / divisor);
      });
      it('returns bad request if divisor is 0 (GET /api/calc/divide)', async () => {
        const [divisible, divisor] = [10, 0];
        const response = await chai
          .request(server)
          .get(`${baseUri}/divide?divisible=${divisible}&divisor=${divisor}`);

        response.should.have.status(400);
        response.should.be.json();
        response.body.should.be.a('object');
      });
      it('returns bad request if not enough arguments provided (GET /api/calc/divide)', async () => {
        const [divisible, divisor] = [10, 3];

        let response = await chai.request(server).get(`${baseUri}/divide?divisible=${divisible}`);
        response.should.have.status(400);
        response.should.be.json();
        response.body.should.be.a('object');

        response = await chai.request(server).get(`${baseUri}/divide?divisor=${divisor}`);
        response.should.have.status(400);
        response.should.be.json();
        response.body.should.be.a('object');

        response = await chai.request(server).get(`${baseUri}/divide`);
        response.should.have.status(400);
        response.should.be.json();
        response.body.should.be.a('object');
      });
      it('returns bad request if parameters have wrong type (GET /api/calc/divide)', async () => {
        const [divisible, divisor] = ['string', '[array]'];

        const response = await chai
          .request(server)
          .get(`${baseUri}/divide?divisible=${divisible}&array=${divisor}`);

        response.should.have.status(400);
        response.should.be.json();
        response.body.should.be.a('object');
      });
    });
    describe('sqrt', () => {
      it('calcs square root of each number (POST /api/calc/sqrt)', async () => {
        const numbers = [1, 2, 3, 4, 5];
        const response = await chai
          .request(server)
          .post(`${baseUri}/sqrt`)
          .set('content-type', 'application/json')
          .send({ numbers });

        response.should.have.status(200);
        response.should.be.json();
        response.body.should.be.a('object');
        response.body.result.should.be.a('array');
        response.body.result.should.eql(numbers.map(Math.sqrt));
      });
      it('returns bad request if no numbers provided (POST /api/calc/sqrt)', async () => {
        const response = await chai
          .request(server)
          .post(`${baseUri}/sqrt`)
          .set('content-type', 'application/json')
          .send({});

        response.should.have.status(400);
        response.should.be.json();
        response.body.should.be.a('object');
      });
      it('returns bad request if some of numbers < 0 (POST /api/calc/sqrt)', async () => {
        const numbers = [1, 2, -3, 4, 5];
        const response = await chai
          .request(server)
          .post(`${baseUri}/sqrt`)
          .set('content-type', 'application/json')
          .send({ numbers });

        response.should.have.status(400);
        response.should.be.json();
        response.body.should.be.a('object');
      });
      it('returns internal server error if numbers amount > 10 (POST /api/calc/sqrt)', async () => {
        const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
        const response = await chai
          .request(server)
          .post(`${baseUri}/sqrt`)
          .set('content-type', 'application/json')
          .send({ numbers });

        response.should.have.status(501);
      });
      it('returns bad request if passed wrong type (POST /api/calc/sqrt)', async () => {
        const numbers = ['1', 'string', [2]];
        const response = await chai
          .request(server)
          .post(`${baseUri}/sqrt`)
          .set('content-type', 'application/json')
          .send({ numbers });

        response.should.have.status(400);
        response.should.be.json();
        response.body.should.be.a('object');
      });
    });
  });
});
