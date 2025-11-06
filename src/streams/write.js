import { createWriteStream } from "fs";
import { pipeline } from "stream/promises";
import path from "path";

const write = async () => {
  const writeFile = path.join(import.meta.dirname, "files", "fileToWrite.txt");
  const writeStream = createWriteStream(writeFile);

  try {
    await pipeline(process.stdin, writeStream);
  } catch (error) {
    throw new Error(error);
  }
};

await write();
