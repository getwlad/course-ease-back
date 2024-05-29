import * as yup from "yup";
import { PersonRequestSchema } from "./PersonRequestSchema";
export const TeacherRequestSchema = yup.object().shape({
  cpfCnpj: yup.string().required(),
  specialization: yup.string().required(),
  experienceYears: yup.number().required(),
  courseId: yup.number().required(),
  person: PersonRequestSchema.required(),
});
