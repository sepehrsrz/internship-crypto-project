const chai = require('chai');
const expect = chai.expect;
require('../src/index')

const url = `http://localhost:4000/`;
const request = require('supertest')


describe('GraphQL', () => {
    it('Returns ranks of analysts', (done) => {
        request(url).post('/graphql')
        .send({ query: '{ analysts_rank { true_decisions acceptable_decisions decisions_rate} }'})
        .expect(200)
        .end((err,res) => {
            if (err) return done(err);
            res.body.user.should.have.property('true_decisions')
            res.body.user.should.have.property('acceptable_decisions')
            res.body.user.should.have.property('decisions_rate')
            done();
        })
    })

    
});
