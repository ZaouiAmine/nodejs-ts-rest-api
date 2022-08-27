import { object, string, ref } from "yup";

const payload = {
  body: object({
    title: string().required("titleis required"),
    body: string()
      .required("body is required")
      .min(128, "body is too short - should be at least 128 characters"),
  }),
};

const params = {
  params: object({
    postId: string().required("postId is required "),
  }),
};

export const createPostSchema = object({
  ...payload,
});

export const updatePostSchema = object({
  ...params,
  ...payload,
});

export const deletePostSchema = object({
  ...params,
});
