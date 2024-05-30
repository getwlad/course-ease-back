import * as yup from "yup";
export const PersonRequestSchema = yup.object().shape({
  name: yup
    .string()
    .min(5, "O nome deve ter pelo menos 5 caracteres")
    .max(100, "O nome deve ter no máximo 100 caracteres")
    .required("O nome é obrigatório"),
  email: yup
    .string()
    .email("Formato de e-mail inválido")
    .min(5, "O e-mail deve ter pelo menos 5 caracteres")
    .max(50, "O e-mail deve ter no máximo 50 caracteres")
    .required("O e-mail é obrigatório"),
  phone: yup
    .string()
    .matches(/^\d{11}$/, "O telefone deve ter exatamente 11 dígitos numéricos")
    .required("O telefone é obrigatório"),
  birthDate: yup
    .date()
    .max(
      new Date(Date.now() - 18 * 365 * 24 * 60 * 60 * 1000),
      "O usuário deve ter pelo menos 18 anos"
    )
    .required("A data de nascimento é obrigatória"),
  gender: yup
    .string()
    .oneOf(
      ["masculino", "feminino", "outros"],
      "O gênero deve ser masculino, feminino ou outros"
    )
    .required("O gênero é obrigatório"),
});
