interface course {
  name: string;
  students: number;
}
interface gender {
  male: number;
  female: number;
  others: number;
}
interface people {
  nome: string;
  curso?: string | null;
  ativo: boolean;
  createdAt: Date;
}
export interface RelatoryResponseDTO {
  totalCourses: number;
  newCourses: number;
  activeCourses: number;
  totalStudents: number;
  activeStudents: number;
  enrolledStudents: number;
  totalTeachers: number;
  activeTeachers: number;
  teachingTeachers: number;
  coursesMostEnrolled: course[];
  totalGender: gender;
  recentlyRegistered: people[];
}
