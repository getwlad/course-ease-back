import * as yup from "yup";
import { PersonRequestSchema } from "./PersonSchema";
export const StudentRequestSchema = yup.object().shape({
  cpf: yup
    .string()
    .matches(/^\d{11}$/, "O CPF deve ter exatamente 11 dígitos numéricos")
    .required("O CPF é obrigatório"),
  courseId: yup.number(),
  personData: PersonRequestSchema.required(),
});

export const StudentUpdateSchema = yup.object().shape({
  active: yup.boolean().required(),
  personData: PersonRequestSchema.required(),
});
