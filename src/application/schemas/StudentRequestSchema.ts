import * as yup from "yup";
import { PersonRequestSchema } from "./PersonRequestSchema";
export const StudentRequestSchema = yup.object().shape({
  cpf: yup.string().required(),
  enrollment: yup.string().required(),
  courseId: yup.number().required(),
  person: PersonRequestSchema.required(),
});
