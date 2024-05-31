import * as yup from "yup";
import { PersonRequestSchema } from "./PersonSchema";
export const TeacherRequestSchema = yup.object().shape({
  cpfCnpj: yup
    .string()
    .matches(
      /^\d{11}$|^\d{14}$/,
      "O CPF/CNPJ deve ter 11 ou 14 dígitos numéricos"
    )
    .required("O CPF/CNPJ é obrigatório"),
  specialization: yup
    .string()
    .min(5, "A especialização deve ter pelo menos 5 caracteres")
    .max(30, "A especialização deve ter no máximo 30 caracteres")
    .required("A especialização é obrigatória"),
  experienceYears: yup
    .number()
    .required("O campo de anos de experiência é obrigatório"),
  courseId: yup.number(),
  personData: PersonRequestSchema.required(),
});

export const TeacherUpdateSchema = yup.object().shape({
  specialization: yup
    .string()
    .min(5, "A especialização deve ter pelo menos 5 caracteres")
    .max(30, "A especialização deve ter no máximo 30 caracteres")
    .required("A especialização é obrigatória"),
  experienceYears: yup
    .number()
    .required("O campo de anos de experiência é obrigatório"),
  active: yup.boolean().required(),
  personData: PersonRequestSchema.required(),
});
