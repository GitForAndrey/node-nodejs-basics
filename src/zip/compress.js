import path from "path";
import { createReadStream, createWriteStream } from "fs";
import zlib from "zlib";
import { pipeline } from "stream/promises";

const compress = async () => {
  const readFile = path.join(
    import.meta.dirname,
    "files",
    "fileToCompress.txt"
  );
  const zipFile = path.join(import.meta.dirname, "files", "archive.gz");
  const streamRead = createReadStream(readFile);
  const streamWrite = createWriteStream(zipFile);

  try {
    await pipeline(streamRead, zlib.Gzip(), streamWrite);
  } catch (error) {
    throw new Error(error);
  }
};

await compress();
