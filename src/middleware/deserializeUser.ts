import { get } from "lodash";
import { Request, Response, NextFunction } from "express";
import { decode } from "../utils/jwt.util";
import { reIssueAccessToken } from "../service/session.service";

const deserializeUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const accessToken = get(req, "headers.authorization", "").replace(
    /^Bearer\s/,
    ""
  );
  const refreshToken = get(req, "headers.x-refresh");
  if (!accessToken) return next();

  const decodeObj = decode(accessToken);

  if (decodeObj?.decoded) {
    //@ts-ignore
    req.user = decoded;

    return next();
  }

  if (decodeObj?.expired && refreshToken) {
    const newAccessToken = await reIssueAccessToken({ refreshToken });
    if (newAccessToken) {
      //Add the new access token to the response header
      res.setHeader("x-access-token", newAccessToken);
      const decodeObj = decode(newAccessToken);

      //@ts-ignore
      req.user = decodeObj?.decoded;

      return next();
    }
    return next();
  }
};

export default deserializeUser;
