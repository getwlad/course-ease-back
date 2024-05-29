import { Person } from "../models";

export class PersonRepository {
  async update(person: Person): Promise<Person> {
    await person.save();
    return person;
  }
}
