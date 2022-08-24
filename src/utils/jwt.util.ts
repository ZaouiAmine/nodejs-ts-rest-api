import config from "config";
import jwt from "jsonwebtoken";

const privateKey = config.get("jwtPrivateKey") as string;

export function sign(object: Object, options: jwt.SignOptions | undefined) {
  return jwt.sign(object, privateKey, options);
}
