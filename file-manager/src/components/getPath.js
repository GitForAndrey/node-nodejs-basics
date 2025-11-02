import path from "path";
import os from "os";

let currentPath = os.homedir();
export const updatePath = (newPath) => {
  try {
    const absolutePath = path.resolve(currentPath, newPath);
    process.chdir(absolutePath);
    currentPath = process.cwd();
    return currentPath;
  } catch (err) {
    console.error("Operation failed");
    return currentPath;
  }
};

export const getCurrentPath = () => {
  return currentPath;
};
