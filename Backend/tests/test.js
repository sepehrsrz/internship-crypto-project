const chai = require('chai');
const expect = chai.expect;
require('../src/index')

const url = `http://localhost:4000/`;
const request = require('supertest')


describe('GraphQL', () => {
    it('Returns bitcoin records', (done) => {
        request(url).post('/graphql')
        .send({ query: `{
            timespan_market(pair:"BTCUSDT",timeframe:"1d",openTime:1652745600000,closeTime:1653609600000) {
              openTime
              closeTime       
            }
          }`})
        .expect(200)
        .end((err,res) => {
            if (err) return done(err);
            res.body.data.should.have.property('openTime')
            res.body.data.should.have.property('closeTime')
            res.body.data.should.have.lengthOf(10)
            done();
        })
    })

    it('Returns ranks of analysts', (done) => {
        request(url).post('/graphql')
        .send({ query: '{ analysts_rank { true_decisions acceptable_decisions decisions_rate} }'})
        .expect(200)
        .end((err,res) => {
            if (err) return done(err);
            res.body.data.should.have.property('true_decisions')
            res.body.data.should.have.property('acceptable_decisions')
            res.body.data.should.have.property('decisions_rate')
            done();
        })
    })

    
});
