import { createReadStream } from "fs";
import { pipeline } from "stream/promises";
import path from "path";

const read = async () => {
  const readFile = path.join(import.meta.dirname, "files", "fileToRead.txt");
  const streamRead = createReadStream(readFile, { encoding: "utf-8" });

  try {
    await pipeline(streamRead, process.stdout);
  } catch (error) {
    throw new Error(error);
  }
};

await read();
