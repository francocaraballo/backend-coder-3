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

export const usersMocks = (n) => {
    const users = []
    for (let i = 0; i < n; i++) {
        const user = {
            id: faker.database.mongodbObjectId(),
            lastName: faker.person.lastName(),
            firstName: faker.person.firstName(),
            password: bcrypt.hashSync('coder123', 10),
            role: faker.helpers.arrayElement(['user', 'admin']),
            pets: []
        }
        users.push(user);
    }
    return users;
}