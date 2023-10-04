import { faker } from "@faker-js/faker";
import { v4 as uuidv4 } from 'uuid';



export function buildRandomPacientProtocol() {
    return {
        priority: faker.datatype.boolean(),
        firstname: faker.person.firstName(),
        lastname: faker.person.lastName(),
    }   
}