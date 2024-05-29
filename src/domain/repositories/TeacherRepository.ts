import { Teacher } from "../models/Teacher";
import sequelize from "../../infrastructure/database/sequelize";
import { Person } from "../models/Person";

export class TeacherRepository {
  async findAll(): Promise<Teacher[]> {
    return Teacher.findAll();
  }

  async findById(id: number): Promise<Teacher> {
    const teacher = await Teacher.findByPk(id);

    if (!teacher) {
      throw new Error(`Professor com id: ${id} não encontrado.`);
    }

    return teacher;
  }

  async create(
    teacherData: Partial<Teacher>,
    personData: Partial<Person>
  ): Promise<Teacher> {
    let transaction;
    try {
      transaction = await sequelize.transaction();

      const person = await Person.create(personData, { transaction });

      teacherData.personId = person.id;

      const teacher = await Teacher.create(teacherData, { transaction });

      await transaction.commit();

      return teacher;
    } catch (error) {
      if (transaction) await transaction.rollback();
      throw error;
    }
  }

  async update(teacher: Teacher): Promise<Teacher> {
    await teacher.save();
    return teacher;
  }

  async delete(teacher: Teacher): Promise<void> {
    let transaction;
    try {
      transaction = await sequelize.transaction();

      await teacher.person.destroy({ transaction });

      await teacher.destroy({ transaction });

      await transaction.commit();
    } catch (error) {
      if (transaction) await transaction.rollback();
      throw error;
    }
  }
}
