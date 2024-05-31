import { Person } from "../models";

export class PersonRepository {
  async update(person: Person): Promise<Person> {
    await person.save();
    return person;
  }
  async existsByPhone(phone: string): Promise<boolean> {
    const person: Person | null = await Person.findOne({ where: { phone } });
    return person != null;
  }
  async existsByEmail(email: string): Promise<boolean> {
    const person: Person | null = await Person.findOne({ where: { email } });
    return person != null;
  }
}
