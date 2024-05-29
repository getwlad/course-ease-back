import { Person } from "../models/Person";

export class PersonRepository {
  async update(person: Person): Promise<Person> {
    await person.save();
    return person;
  }
}
