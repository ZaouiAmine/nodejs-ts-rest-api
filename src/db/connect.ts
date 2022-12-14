import mongoose from "mongoose";
import config from "config";
import log from "../logger";

const connect = () => {
  const dbUri = config.get("dbUri") as string;
  return mongoose
    .connect(dbUri)
    .then(() => {
      log.info("database connected");
    })
    .catch((error) => {
      log.error("database error", error);
      process.exit(1);
    });
};

export default connect;
