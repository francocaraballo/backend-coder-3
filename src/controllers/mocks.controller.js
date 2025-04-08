import { faker } from "@faker-js/faker";
import bcrypt from 'bcrypt';

export const petsMocks = (n) => {
    const pets = [];
    for (let i = 0; i < n; i++) {
        const pet = {
            type: faker.animal.type(),
            name: faker.person.firstName()
        }
        pets.push(pet);
    }
    return pets;
}

export const usersMocks =  async (n) => {
    const users = []
    for (let i = 0; i < n; i++) {
        const user = {
            lastName: faker.person.lastName(),
            firstName: faker.person.firstName(),
            password: bcrypt.hashSync('coder123', 10)
        }
        users.push(user);
    }
    return users;
}