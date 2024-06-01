import { Op, Sequelize } from "sequelize";
import { Course, Person, Student, Teacher } from "../models";
import { RelatoryResponseDTO } from "../../application/dto/relatory/RelatoryResponseDTO";

export class RelatoryService {
  constructor(
    private courseModel = Course,
    private personModel = Person,
    private studentModel = Student,
    private teacherModel = Teacher
  ) {}

  async getDashboardRelatory(): Promise<RelatoryResponseDTO> {
    // Total de cursos
    const totalCourses = await this.courseModel.count();

    // Novos cursos (adicionados recentemente)
    const newCourses = await this.courseModel.count({
      where: {
        created_at: {
          [Op.gte]: new Date(new Date().setDate(new Date().getDate() - 30)),
        },
      },
    });

    // Cursos ativos
    const activeCourses = await this.courseModel.count({
      where: { active: true },
    });

    // Total de estudantes
    const totalStudents = await this.studentModel.count();

    // Estudantes ativos
    const activeStudents = await this.studentModel.count({
      where: { active: true },
    });

    // Estudantes matriculados
    const enrolledStudents = await this.studentModel.count({
      where: { courseId: { [Op.ne]: null } },
    });

    // Total de professores
    const totalTeachers = await this.teacherModel.count();

    // Professores ativos
    const activeTeachers = await this.teacherModel.count({
      where: { active: true },
    });

    // Professores lecionando
    const teachingTeachers = await this.teacherModel.count({
      where: { courseId: { [Op.ne]: null } },
    });

    // Cursos com mais matrículas
    const coursesMostEnrolled = await this.courseModel.findAll({
      include: [
        {
          model: Student,
          attributes: [],
        },
      ],
      attributes: [
        "name",
        [Sequelize.fn("COUNT", Sequelize.col("students.id")), "studentsCount"],
      ],
      group: ["Course.id"],
      order: [[Sequelize.literal('"studentsCount"'), "DESC"]],
      limit: 5,
      subQuery: false,
    });

    // Distribuição de gênero
    const totalGender = await this.personModel.findAll({
      attributes: [
        [Sequelize.fn("COUNT", Sequelize.col("id")), "total"],
        "gender",
      ],
      group: ["gender"],
    });

    // Recentemente registrados
    const recentlyRegistered = await this.personModel.findAll({
      include: [{ model: Student, attributes: ["courseId", "active"] }],
      order: [["created_at", "DESC"]],
      limit: 20, // Limitar a 20 registros
    });

    // Formatar dados de distribuição de gênero
    const genderData = { male: 0, female: 0, others: 0 };
    totalGender.forEach((entry: any) => {
      switch (entry.getDataValue("gender")) {
        case "masculino":
          genderData.male = entry.getDataValue("total");
          break;
        case "feminino":
          genderData.female = entry.getDataValue("total");
          break;
        case "outros":
          genderData.others = entry.getDataValue("total");
          break;
      }
    });

    // Retornar o relatório
    return {
      totalCourses,
      newCourses,
      activeCourses,
      totalStudents,
      activeStudents,
      enrolledStudents,
      totalTeachers,
      activeTeachers,
      teachingTeachers,
      coursesMostEnrolled: coursesMostEnrolled.map((course: any) => ({
        name: course.name,
        students: course.getDataValue("studentsCount"),
      })),
      totalGender: genderData,
      recentlyRegistered: await Promise.all(
        recentlyRegistered.map(async (person: any) => ({
          nome: person.name,
          curso: person.student?.courseId
            ? await this.courseModel
                .findByPk(person.student.courseId)
                .then((course) => course?.name)
            : null,
          ativo: person.student?.active ?? false,
          createdAt: person.createdAt,
        }))
      ),
    };
  }
}
