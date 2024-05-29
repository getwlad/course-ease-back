import { Course, Teacher } from "../models";
import sequelize from "../../infrastructure/database/sequelize";
import { Person } from "../models";

export class TeacherRepository {
  async findAll(): Promise<Teacher[]> {
    return Teacher.findAll({
      nest: true,
      include: [
        {
          model: Person,
          as: "person",
        },
      ],
    });
  }

  async findById(id: number): Promise<Teacher> {
    const teacher = await Teacher.findByPk(id, {
      nest: true,
      include: [
        {
          model: Person,
          as: "person",
        },
        {
          model: Course,
          as: "course",
        },
      ],
    });
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

      return this.reloadModel(teacher);
    } catch (error) {
      if (transaction) await transaction.rollback();
      throw error;
    }
  }

  async update(teacher: Teacher): Promise<Teacher> {
    await teacher.save();
    return this.reloadModel(teacher);
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

  async reloadModel(teacher: Teacher) {
    return await teacher.reload({
      include: [
        {
          model: Person,
          as: "person",
        },
        {
          model: Course,
          as: "course",
        },
      ],
    });
  }
}
