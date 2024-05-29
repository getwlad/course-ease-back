import { Course, Student, Teacher } from "../models";
import { Person } from "../models";
import sequelize from "../../infrastructure/database/sequelize";

export class StudentRepository {
  async findAll(): Promise<Student[]> {
    return Student.findAll({
      nest: true,
      include: [
        {
          model: Person,
          as: "person",
        },
      ],
    });
  }

  async findById(id: number): Promise<Student> {
    const student = await Student.findByPk(id, {
      nest: true,
      include: [
        {
          model: Person,
          as: "person",
        },
        {
          model: Course,
          as: "course",
          include: [
            {
              model: Teacher,
              as: "teacher",
              include: [
                {
                  model: Person,
                  as: "person",
                },
              ],
            },
          ],
        },
      ],
    });

    if (!student) {
      throw new Error(`Estudante com id: ${id} não encontrado.`);
    }

    return student;
  }

  async create(
    studentData: Partial<Student>,
    personData: Partial<Person>,
    enrollment: string
  ): Promise<Student> {
    let transaction;
    try {
      transaction = await sequelize.transaction();

      const person = await Person.create(personData, { transaction });

      studentData.personId = person.id;
      studentData.enrollment = enrollment;

      const student = await Student.create(studentData, { transaction });

      await transaction.commit();

      return this.reloadModel(student);
    } catch (error) {
      if (transaction) await transaction.rollback();
      throw error;
    }
  }

  async update(student: Student): Promise<Student> {
    await student.save();
    return this.reloadModel(student);
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

  async reloadModel(student: Student) {
    return await student.reload({
      include: [
        {
          model: Person,
          as: "person",
        },
        {
          model: Course,
          as: "course",
          include: [
            {
              model: Teacher,
              as: "teacher",
              include: [
                {
                  model: Person,
                  as: "person",
                },
              ],
            },
          ],
        },
      ],
    });
  }

  async findByCPF(cpf: string): Promise<Student | null> {
    const student = await Student.findOne({ where: { cpf } });
    return student;
  }

  async existsByCPF(cpf: string): Promise<boolean> {
    return (await this.findByCPF(cpf)) !== null;
  }

  async existsByEnrollment(enrollment: string): Promise<boolean> {
    const student = await Student.findOne({ where: { enrollment } });
    return student !== null;
  }
}
