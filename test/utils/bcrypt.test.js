import { hashPassword, comparePassword } from "../../src/utils/bcrypt.js";
import { expect } from "chai";

describe("Test in bcrypt", function() {
    it("Hasheo and compare a valid password", function(){
        const password = "pass123"
        const hashPass = hashPassword(password)
        const isValidPass = comparePassword(password, hashPass)
        expect(isValidPass).to.be.true
    })
    it("Hasheo and compare a invalid password", function(){
        const password = "pass123"
        const hashPass = hashPassword(password)
        const invalidPass = "1234"
        const isValidPass = comparePassword(invalidPass, hashPass)
        expect(isValidPass).to.be.false
    })
})