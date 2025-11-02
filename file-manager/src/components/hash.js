import { createHash } from "crypto";
import { createReadStream } from "fs";
import { pipeline } from "stream/promises";
import path from "path";
import { getCurrentPath } from "./getPath.js";

export const hash_command = async (args) => {
  const currentPath = getCurrentPath();
  const filePath = path.join(currentPath, args[0]);

  const hash = createHash("sha256");
  const stream = createReadStream(filePath);

  try {
    await pipeline(stream, hash);
    const hexHash = hash.digest("hex");
    console.log(hexHash);
  } catch (error) {
    console.log("Operation failed");
  }
};
