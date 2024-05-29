import * as yup from "yup";
export const CourseRequestSchema = yup.object().shape({
  name: yup
    .string()
    .min(5, "O nome deve ter pelo menos 5 caracteres")
    .max(100, "O nome deve ter no máximo 100 caracteres")
    .required("O nome é obrigatório"),
  category: yup
    .string()
    .min(5, "A categoria deve ter pelo menos 5 caracteres")
    .max(50, "A categoria deve ter no máximo 50 caracteres")
    .required("A categoria é obrigatória"),
  active: yup.boolean().required("O campo ativo é obrigatório"),
  description: yup
    .string()
    .min(10, "A descrição deve ter pelo menos 10 caracteres")
    .max(255, "A descrição deve ter no máximo 255 caracteres")
    .required("A descrição é obrigatória"),
});
