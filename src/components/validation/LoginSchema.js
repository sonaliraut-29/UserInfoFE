import * as Yup from "yup";

export const schema = Yup.object().shape({
  email: Yup.string().email().required(),
  password: Yup.string().min(8).required(),
});
