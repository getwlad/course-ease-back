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

  async delete(teacher: Teacher): Promise<Teacher> {
    teacher.active = false;
    await this.update(teacher);
    return teacher;
  }

  async existsByCNPJ(cnpj: string): Promise<boolean> {
    const teacher: Teacher | null = await Teacher.findOne({
      where: { cpfCnpj: cnpj },
    });
    return teacher != null;
  }
  async existsByCPF(cpf: string): Promise<boolean> {
    const teacher: Teacher | null = await Teacher.findOne({
      where: { cpfCnpj: cpf },
    });
    return teacher != null;
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
