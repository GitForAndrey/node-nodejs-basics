import fs from "fs/promises";
import path from "path";

const remove = async () => {
  let removeFile = path.join(import.meta.dirname, "files", "fileToRemove.txt");
  let errorText = "FS operation failed";

  try {
    await fs.rm(removeFile);
  } catch (error) {
    throw new Error(errorText);
  }
};

await remove();
