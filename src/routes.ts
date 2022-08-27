import { Express, Request, Response } from "express";
import { validateRequest, requiresUser } from "./middleware";

import { createUserHandler } from "./controller/user.controller";
import {
  createUserSessionHandler,
  invalidateUserSessionHandler,
  getUserSessionHandler,
} from "./controller/session.controller";
import {
  createPostHandler,
  updatePostHandler,
  deletePostHandler,
  getPostHandler,
} from "./controller/post.controller";

import {
  createUserSchema,
  createUserSessionSchema,
} from "./schema/user.schema";
import {
  createPostSchema,
  updatePostSchema,
  deletePostSchema,
} from "./schema/post.schema";

export default function (app: Express) {
  app.get("/healthcheck", (req: Request, res: Response) => {
    res.sendStatus(200);
  });
  // register the user
  app.post("/api/users", validateRequest(createUserSchema), createUserHandler);

  // login
  app.post(
    "/api/sessions",
    validateRequest(createUserSessionSchema),
    createUserSessionHandler
  );

  // get the user's session
  app.get("/api/sessions", requiresUser, getUserSessionHandler);

  // logout
  app.delete("/api/sessions", requiresUser, invalidateUserSessionHandler);

  // create a post
  app.post(
    "/api/posts",
    [requiresUser, validateRequest(createPostSchema)],
    createPostHandler
  );

  // update a post
  app.put(
    "/api/post/:postId",
    [requiresUser, validateRequest(updatePostSchema)],
    updatePostHandler
  );
  // get a post
  app.get("/api/post/:postId", getPostHandler);

  // delete a post
  app.delete(
    "/api/post/:postId",
    [requiresUser, validateRequest(deletePostSchema)],
    deletePostHandler
  );
}
