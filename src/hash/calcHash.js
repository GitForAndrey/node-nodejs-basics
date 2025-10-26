import { createHash } from "crypto";
import { createReadStream } from "fs";
import { pipeline } from "stream/promises";
import path from "path";

const calculateHash = async () => {
  const hashFile = path.join(
    import.meta.dirname,
    "files",
    "fileToCalculateHashFor.txt"
  );

  const hash = createHash("sha256");
  const stream = createReadStream(hashFile);

  try {
    await pipeline(stream, hash);
    const hexHash = hash.digest("hex");
    console.log(hexHash);
    return hexHash;
  } catch (error) {
    throw new Error(error);
  }
};

await calculateHash();
