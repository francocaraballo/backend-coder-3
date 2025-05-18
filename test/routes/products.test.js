import supertest from "supertest";
import { expect } from "chai";

describe("Testing on products endpoint", function(){
    const requester = supertest("http://localhost:8080")

    it("Debe retornar una lista de productos de /api/products GET", async function (){
        const { statusCode, ok, _body } = await requester.get("/api/products")
        expect(statusCode).to.be.eq(200)
        expect(ok).to.be.eq(true)
        expect(_body.payload).to.have.property('_id')
    })
})