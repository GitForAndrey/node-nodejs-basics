import path from "path";
import { createReadStream, createWriteStream } from "fs";
import zlib from "zlib";
import { pipeline } from "stream/promises";

const decompress = async () => {
  const readFile = path.join(
    import.meta.dirname,
    "files",
    "fileToCompress.txt"
  );
  const zipFile = path.join(import.meta.dirname, "files", "archive.gz");
  const streamRead = createReadStream(zipFile);
  const streamWrite = createWriteStream(readFile);

  try {
    await pipeline(streamRead, zlib.Unzip(), streamWrite);
  } catch (error) {
    throw new Error(error);
  }
};

await decompress();
