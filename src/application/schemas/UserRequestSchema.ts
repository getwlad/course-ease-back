import * as yup from "yup";
export const UserRequestSchema = yup.object().shape({
  username: yup
    .string()
    .min(4, "O nome de usuário deve ter no mínimo 4 caracteres")
    .max(20, "O nome de usuário deve ter no máximo 20 caracteres")
    .required("O nome de usuário é obrigatório"),
  password: yup
    .string()
    .min(8, "A senha deve ter no mínimo 8 caracteres")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
      "A senha deve conter pelo menos 1 letra maiúscula, 1 letra minúscula e 1 número"
    )
    .required("A senha é obrigatória"),
});
