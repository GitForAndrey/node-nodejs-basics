import fs from "fs/promises";
import path from "path";

const create = async () => {
  let pathFolder = path.join(import.meta.dirname, "files", "fresh.txt");
  let fileText = "I am fresh and young";
  let errorText = "FS operation failed";

  try {
    await fs.writeFile(pathFolder, fileText, { flag: "wx" });
  } catch (error) {
    throw new Error(errorText);
  }
};

await create();
