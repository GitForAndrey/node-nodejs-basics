import fs from "fs/promises";
import path from "path";

const list = async () => {
  let folderPath = path.join(import.meta.dirname, "files");
  let errorText = "FS operation failed";

  try {
    let data = await fs.readdir(folderPath);
    console.log(data);
  } catch (error) {
    throw new Error(errorText);
  }
};

await list();
