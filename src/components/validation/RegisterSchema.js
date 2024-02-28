import * as Yup from "yup";

export const schema = Yup.object().shape({
  firstname: Yup.string().required(),
  lastname: Yup.string().required(),
  email: Yup.string().email().required(),
  password: Yup.string().min(8).required(),
  phoneno: Yup.number().min(10).required(),
  dateofbirth: Yup.date().required(),
  gender: Yup.mixed().oneOf(["male", "female", "other"]).defined(),
  address: Yup.array().of(
    Yup.object().shape({
      streetAddress: Yup.string().required(),
      city: Yup.string().required(),
      state: Yup.string().required(),
      zipcode: Yup.string().required(),
      country: Yup.string().required(),
    })
  ),
});
