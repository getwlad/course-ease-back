import { Person } from "../../../domain/models";
import { PersonRepository } from "../../../domain/repositories/PersonRepository";

export class PersonService {
  private personRepository: PersonRepository;

  constructor() {
    this.personRepository = new PersonRepository();
  }

  async updatePerson(person: Person): Promise<Person> {
    return this.personRepository.update(person);
  }
}
