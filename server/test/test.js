let chai = require ("chai");
let chaiHttp = require("chai-http");
let server = require("../app");
let express = require("express");

// Assertion style
chai.should();
chai.use(chaiHttp);
describe('contact API', ()=>{
    // test get all blogs
    describe('GET /api/contacts',()=>{
        it('It should get all the contacts', (done)=>{
            chai.request(server)
                .get('/api/contacts')
                .end((err,response)=>{
                    response.should.have.status(200);
                    response.body.should.be.a('array');
                    done();
                });
        });
    });

    describe('GET /api/contacts',()=>{
        it('It should not get all the contacts', (done)=>{
            chai.request(server)
                .get('/contact')
                .end((err,response)=>{
                    response.should.have.status(404);
                    done();
                });
        });
    });

    // test post contact
    describe('POST /api/contacts',()=>{
        it('It should post a new contact', (done)=>{
            const contact = {
                firstName: "sebastitne",
                lastName: "ndagijimana",
                email: "ndase15ba@gmail.com",
                message:  "email from test brahbrah brahbreah brah brah"
            }
            chai.request(server)
                .post('/api/contacts')
                .send(contact)
                .end((err,response)=>{
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    done();
                });
        });
    });
});
