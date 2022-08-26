import config from "config";
import jwt from "jsonwebtoken";

const privateKey = config.get("jwtPrivateKey") as string;

export function sign(object: Object, options: jwt.SignOptions | undefined) {
  return jwt.sign(object, privateKey, options);
}

export function decode(token: string) {
  try {
    const decoded = jwt.verify(token, privateKey);
    return { valid: true, expired: false, decoded };
  } catch (error) {
    console.log({ error });

    if (error instanceof Error) {
      return {
        valid: false,
        expired: error.message === "jwt expired",
        decoded: null,
      };
    } else {
      console.log("Unexpected error", error);
    }
  }
}
