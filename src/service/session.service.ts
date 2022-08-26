import { LeanDocument, UpdateQuery, FilterQuery } from "mongoose";
import Session, { SessionDocument } from "../model/session.model";
import { UserDocument } from "../model/user.model";
import config from "config";
import { get } from "lodash";
import { sign, decode } from "../utils/jwt.util";
import { findUser } from "../service/user.service";

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

export async function reIssueAccessToken({
  refreshToken,
}: {
  refreshToken: string;
}) {
  //decode the refresh token
  const decodeObj = decode(refreshToken);
  if (!decodeObj?.decoded || !get(decodeObj?.decoded, "_id")) return false;

  //get the session
  const session = await Session.findById(get(decodeObj?.decoded, "_id"));

  //make sure the session is  still valid
  if (!session || !session?.valid) return false;

  const user = await findUser({ id: session.user });

  if (!user) return false;

  const accessToken = createAccessToken({ user, session });

  return accessToken;
}

export async function updateSession(
  query: FilterQuery<SessionDocument>,
  update: UpdateQuery<SessionDocument>
) {
  return Session.updateOne(query, update);
}
