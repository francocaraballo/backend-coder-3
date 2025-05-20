import app from '../../src/app.js';
import { expect } from 'chai';
import supertest from "supertest";

const requester = supertest(app);
describe("Test en sessions routes", async () => {
    const userMock = {
        first_name: "test",
        last_name: "test1",
        password: "pass123",
        email:"test1@test.com",
        age: 30
    }
    it("Debe crear un nuevo usuario", async () => {
        // Cambiar el mail por otro a la hora de realizar el test, ya que tiene que ser unico
        const { statusCode, ok } = await requester.post('/api/sessions/register').send(userMock);

       expect(statusCode).to.be.eq(201);
       expect(ok).to.be.eq(true);
    })

    it("Debe logear correctamente al usuario creado", async () => {

        const { statusCode, ok } = await requester.post('/api/sessions/login').send(userMock);
        expect(statusCode).to.be.eq(200);
        expect(ok).to.be.eq(true);
    })
})