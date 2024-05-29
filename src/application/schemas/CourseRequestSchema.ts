import * as yup from "yup";
export const CourseRequestSchema = yup.object().shape({
  name: yup.string().required(),
  category: yup.string().required(),
  active: yup.boolean().required(),
  description: yup.string().required(),
});
