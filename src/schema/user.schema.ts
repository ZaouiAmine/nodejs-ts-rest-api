import { object, string, ref } from "yup";

export const createUserSchema = object({
  body: object({
    name: string().required("name is required"),
    password: string()
      .required("password is required")
      .min(6, "password should be longer than 5 characters")
      .matches(
        /^[a-zA-Z0-9_.-]*$/,
        "password can only contain latin characters"
      ),
    passwordConfirmation: string().oneOf(
      [ref("password"), null],
      "passwords must match"
    ),
    email: string()
      .email("Must be a valid email")
      .required("Email is required"),
  }),
});

export const createUserSessionSchema = object({
  body: object({
    password: string()
      .required("password is required")
      .min(6, "password should be longer than 5 characters")
      .matches(
        /^[a-zA-Z0-9_.-]*$/,
        "password can only contain latin characters"
      ),

    email: string()
      .email("Must be a valid email")
      .required("Email is required"),
  }),
});
