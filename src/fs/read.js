import fs from "fs/promises";
import path from "path";

const read = async () => {
  let filePath = path.join(import.meta.dirname, "files", "fileToRead.txt");
  let errorText = "FS operation failed";

  try {
    let data = await fs.readFile(filePath, "utf8");
    console.log(data);
  } catch (error) {
    throw new Error(errorText);
  }
};

await read();
