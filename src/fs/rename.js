import fs from "fs/promises";
import path from "path";

const rename = async () => {
  let oldFile = path.join(import.meta.dirname, "files", "wrongFilename.txt");
  let newFile = path.join(import.meta.dirname, "files", "properFilename.md");
  let errorText = "FS operation failed";

  try {
    let results = await Promise.allSettled([
      fs.access(oldFile, fs.constants.F_OK),
      fs.access(newFile, fs.constants.F_OK),
    ]);
    let isOldFiles = results[0].status === "fulfilled";
    let isNewFiles = results[1].status === "rejected";

    if (isOldFiles && isNewFiles) {
      try {
        await fs.rename(oldFile, newFile);
      } catch (err) {
        throw new Error(errorText);
      }
    } else {
      throw new Error(errorText);
    }
  } catch (error) {
    throw new Error(errorText);
  }
};

await rename();
