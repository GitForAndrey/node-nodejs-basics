import { createReadStream, constants, createWriteStream } from "fs";
import { writeFile, mkdir, rename, access, unlink, rm } from "fs/promises";
import path from "path";
import { pipeline } from "stream/promises";
import { getCurrentPath } from "./getPath.js";

export const cat_command = async (fileName) => {
  const currentPath = getCurrentPath();
  if (!fileName || fileName.length === 0) {
    console.log("Invalid input");
    return;
  }
  const filePath = path.join(currentPath, fileName[0]);
  await pipeline(
    createReadStream(filePath, { encoding: "utf-8" }),
    process.stdout,
    { end: false }
  );
};
export const add_command = async (fileName) => {
  const currentPath = getCurrentPath();
  if (!fileName || fileName.length === 0) {
    console.log("Invalid input");
    return;
  }
  const filePath = path.join(currentPath, fileName[0]);

  try {
    await writeFile(filePath, "", { flag: "wx" });
    console.log(`${fileName[0]} is created!`);
  } catch (error) {
    console.log("Operation failed");
  }
};
export const mkdir_command = async (fileName) => {
  const currentPath = getCurrentPath();
  if (!fileName || fileName.length === 0) {
    console.log("Invalid input");
    return;
  }
  const filePath = path.join(currentPath, fileName[0]);

  try {
    await mkdir(filePath, { recursive: true });
    console.log(`${fileName[0]} is created!`);
  } catch (error) {
    console.log("Operation failed");
  }
};
export const rn_command = async (data) => {
  const currentPath = getCurrentPath();
  const [pathToFile, newFileName] = data;
  if (!pathToFile || !newFileName) {
    console.log("Invalid input");
    return;
  }
  const filePathOld = path.join(currentPath, pathToFile);
  const filePathNew = path.join(currentPath, newFileName);
  try {
    let results = await Promise.allSettled([
      access(filePathOld, constants.F_OK),
      access(filePathNew, constants.F_OK),
    ]);
    let isOldFiles = results[0].status === "fulfilled";
    let isNewFiles = results[1].status === "rejected";

    if (isOldFiles && isNewFiles) {
      try {
        await rename(filePathOld, filePathNew);
      } catch (err) {
        console.log("Operation failed");
      }
    } else {
      console.log("Operation failed");
    }
  } catch (error) {
    console.log("Operation failed");
  }
};
export const cp_command = async (data) => {
  const currentPath = getCurrentPath();
  const [srcPath, destPath] = data;
  if (!srcPath || !destPath) {
    console.log("Invalid input");
    return;
  }
  const filePath = path.join(currentPath, srcPath);
  await access(filePath, constants.R_OK | constants.W_OK);

  let destFilePath = path.join(currentPath, destPath);
  try {
    await pipeline(createReadStream(filePath), createWriteStream(destFilePath));
  } catch (error) {
    console.log("Operation failed");
  }
};
export const mv_command = async (data) => {
  const currentPath = getCurrentPath();
  const [srcPath, destPath] = data;
  if (!srcPath || !destPath) {
    console.log("Invalid input");
    return;
  }
  const filePath = path.join(currentPath, srcPath);
  await access(filePath, constants.R_OK | constants.W_OK);
  let destFilePath = path.join(currentPath, destPath);
  try {
    await pipeline(createReadStream(filePath), createWriteStream(destFilePath));
    await unlink(filePath);
  } catch (error) {
    console.log("Operation failed");
  }
};
export const rm_command = async (args) => {
  const currentPath = getCurrentPath();
  if (!args || args.length === 0) {
    console.log("Invalid input");
    return;
  }
  const removeFile = path.join(currentPath, args[0]);

  try {
    await rm(removeFile);
  } catch (error) {
    console.log("Operation failed");
  }
};
