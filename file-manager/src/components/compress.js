import { pipeline } from "stream/promises";
import { createReadStream, createWriteStream } from "fs";
import { createBrotliCompress, createBrotliDecompress } from "zlib";
import { getCurrentPath } from "./getPath.js";
import path from "path";

export const compress_command = async (args) => {
  const currentPath = getCurrentPath();
  const [srcPath, destPath] = args;

  if (!srcPath || !destPath) {
    console.log("Invalid input");
    return;
  }
  const fileNameWithExt = destPath + ".br";
  const filePathStart = path.join(currentPath, srcPath);
  const filePathEnd = path.join(currentPath, fileNameWithExt);

  await pipeline(
    createReadStream(filePathStart, { encoding: "utf-8" }),
    createBrotliCompress(),
    createWriteStream(filePathEnd)
  );
};

export const decompress_command = async (args) => {
  const currentPath = getCurrentPath();
  const [srcPath, destPath] = args;

  if (!srcPath || !destPath) {
    console.log("Invalid input");
    return;
  }
  const filePathStart = path.join(currentPath, srcPath);
  const filePathEnd = path.join(currentPath, destPath);

  await pipeline(
    createReadStream(filePathStart),
    createBrotliDecompress(),
    createWriteStream(filePathEnd, { encoding: "utf-8" })
  );
};
