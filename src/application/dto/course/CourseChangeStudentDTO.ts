export interface CourseChangeStudentResDTO {
  courseId: number;
  course: string;
  success: number[];
  failed: number[];
}

export interface CourseChangeStudentReqDTO {
  studentIds: number[];
}
