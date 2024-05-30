export interface CourseAddStudentResDTO {
  courseId: number;
  course: string;
  addedStudents: number[];
  notAddedStudents: number[];
}
