import { stat, readdir } from "fs/promises";
import path from "path";
import { getCurrentPath, updatePath } from "./getPath.js";

export const ls_command = async () => {
  try {
    const tableData = [];
    const currentPath = getCurrentPath();

    const items = await readdir(currentPath, { withFileTypes: true });
    const data = items
      .map((item) => ({
        Name: item.name,
        Type: item.isDirectory() ? "directory" : "file",
      }))
      .sort((first, second) => {
        if (first.Type !== second.Type) {
          return first.Type === "directory" ? -1 : 1;
        }
      });
    console.table(data);
  } catch (err) {
    console.log(`Dir error: ${err.message}`);
  }
};
export const cd_command = async (args) => {
  const currentPath = getCurrentPath();

  if (!args || args.length === 0) {
    console.log("Invalid input");
    return;
  }
  try {
    const absolutePath = path.resolve(currentPath, args[0]);
    const pathStat = await stat(absolutePath);
    if (!pathStat.isDirectory()) {
      console.log("Operation failed");
    }

    updatePath(args[0]);
  } catch (error) {
    console.log("Operation failed");
  }
};
export const up_command = async () => {
  try {
    updatePath("..");
  } catch (error) {
    console.log("Operation failed");
  }
};
