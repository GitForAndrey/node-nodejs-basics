import readline from "readline";
import process from "process";
import {
  add_command,
  cat_command,
  cp_command,
  mkdir_command,
  mv_command,
  rm_command,
  rn_command,
} from "./components/fs.js";
import { getCurrentPath } from "./components/getPath.js";
import { hash_command } from "./components/hash.js";
import { compress_command, decompress_command } from "./components/compress.js";
import { os_commands } from "./components/os.js";
import { cd_command, ls_command, up_command } from "./components/navigation.js";

let currentPath = getCurrentPath();

const getUsername = () => {
  const args = process.argv;
  let username = "User";

  for (let i = 0; i < args.length; i++) {
    if (args[i].startsWith("--username=")) {
      username = args[i].split("=")[1];
      break;
    }
  }
  return username;
};
const username = getUsername();

async function main() {
  console.log(`Welcome to the File Manager, ${username}!\n`);
  console.log(`You are currently in ${currentPath}\n`);

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: `> `,
  });

  rl.prompt();

  rl.on("line", async (line) => {
    const [command, ...args] = line.trim().split(" ");
    try {
      await executeCommand(command, args);
    } catch (error) {
      console.error(`Error ${error.message}`);
    }
    console.log(`\nYou are currently in ${getCurrentPath()}`);
    rl.prompt();
  }).on("close", () => {
    console.log(`\nThank you for using File Manager, ${username}, goodbye!`);
    process.exit(0);
  });
}

async function executeCommand(command, args) {
  switch (command.toLowerCase()) {
    case "ls":
      await ls_command();
      break;
    case "cd":
      await cd_command(args);
      break;
    case "up":
      await up_command();
      break;
    case "cat":
      await cat_command(args);
      break;
    case "add":
      await add_command(args);
      break;
    case "mkdir":
      await mkdir_command(args);
      break;
    case "rn":
      await rn_command(args);
      break;
    case "cp":
      await cp_command(args);
      break;
    case "mv":
      await mv_command(args);
      break;
    case "rm":
      await rm_command(args);
      break;
    case "hash":
      await hash_command(args);
      break;
    case "compress":
      await compress_command(args);
      break;
    case "decompress":
      await decompress_command(args);
      break;
    case "os":
      await os_commands(args);
      break;
    case ".exit":
      console.log(`\nThank you for using File Manager, ${username}, goodbye!`);
      process.exit(0);

    default:
      console.log(`Invalid input`);
  }
}

main();
