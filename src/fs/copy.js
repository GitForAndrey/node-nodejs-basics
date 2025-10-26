import fs from "fs/promises";
import path from "path";

const copy = async () => {
  let folderFiles = path.join(import.meta.dirname, "files");
  let folderFilesCopy = path.join(import.meta.dirname, "files_copy");
  let errorText = "FS operation failed";

  try {
    //create promise to check if folders exist
    let results = await Promise.allSettled([
      fs.access(folderFiles, fs.constants.F_OK),
      fs.access(folderFilesCopy, fs.constants.F_OK),
    ]);
    //save exist check results
    let isFolderFiles = results[0].status === "fulfilled";
    let isfolderFilesCopy = results[1].status === "rejected";

    //copy to new folder if conditions true
    if (isFolderFiles && isfolderFilesCopy) {
      try {
        await fs.cp(folderFiles, folderFilesCopy, { recursive: true });
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

await copy();
