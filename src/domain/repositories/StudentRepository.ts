import { Student } from "../models/Student";
import { Person } from "../models/Person";
import sequelize from "../../infrastructure/database/sequelize";

export class StudentRepository {
  async findAll(): Promise<Student[]> {
    return Student.findAll();
  }

  async findById(id: number): Promise<Student> {
    const student = await Student.findByPk(id);

    if (!student) {
      throw new Error(`Estudante com id: ${id} não encontrado.`);
    }

    return student;
  }

  async create(
    studentData: Partial<Student>,
    personData: Partial<Person>
  ): Promise<Student> {
    let transaction;
    try {
      transaction = await sequelize.transaction();

      const person = await Person.create(personData, { transaction });

      studentData.personId = person.id;

      const teacher = await Student.create(studentData, { transaction });

      await transaction.commit();

      return teacher;
    } catch (error) {
      if (transaction) await transaction.rollback();
      throw error;
    }
  }

  async update(student: Student): Promise<Student> {
    await student.save();
    return student;
  }

  async delete(student: Student): Promise<void> {
    let transaction;
    try {
      transaction = await sequelize.transaction();

      await student.person.destroy({ transaction });

      await student.destroy({ transaction });

      await transaction.commit();
    } catch (error) {
      if (transaction) await transaction.rollback();
      throw error;
    }
  }
}
