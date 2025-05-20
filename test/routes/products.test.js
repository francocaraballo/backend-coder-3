import supertest from "supertest";
import { expect } from "chai";

describe("Testing on products endpoint", function(){
    const requester = supertest("http://localhost:8080")

    it("Debe retornar una vista /api/products GET", async function (){
        const response = await requester.get("/api/products")
        expect(response.statusCode).to.be.eq(200)
        expect(response.ok).to.be.eq(true)
        
        // Comprobamos que la respuestas contiene HTML
        expect(response.headers['content-type']).to.include('text/html')

        // Se comprueba el elemento HTML que tendria que contener nuestra vista
        expect(response.text).to.include('<!DOCTYPE html>');
    })
})