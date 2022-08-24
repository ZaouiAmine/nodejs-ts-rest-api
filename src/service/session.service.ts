import { LeanDocument } from "mongoose";
import Session, { SessionDocument } from "../model/session.model";
import { UserDocument } from "../model/user.model";
import config from "config";
import { sign } from "../utils/jwt.util";

export async function createSession(userId: string, userAgent: string) {
  const session = await Session.create({ user: userId, userAgent });
  return session.toJSON();
}

export function createAccessToken({
  user,
  session,
}: {
  user:
    | any
    | Omit<UserDocument, "password">
    | LeanDocument<Omit<UserDocument, "password">>;
  session: any | SessionDocument | LeanDocument<SessionDocument>;
}) {
  const accessToken = sign(
    { ...user, session: session._id },
    { expiresIn: config.get("accessTokenTtl") }
  );
  return accessToken;
}