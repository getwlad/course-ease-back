import * as yup from "yup";
export const PersonRequestSchema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  phone: yup.string().required(),
  birthDate: yup.date().required(),
  gender: yup.string().oneOf(["masculino", "feminino", "outros"]).required(),
});
