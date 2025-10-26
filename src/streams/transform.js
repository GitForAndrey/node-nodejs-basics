import { Transform } from "stream";
import { pipeline } from "stream/promises";

const transform = async () => {
  class reverseTranform extends Transform {
    _transform(chunk, _, callback) {
      const data = chunk?.toString().split("").reverse().join("");
      callback(null, data);
    }
  }

  try {
    await pipeline(process.stdin, new reverseTranform(), process.stdout);
  } catch (error) {
    console.error(error);
  }
};

await transform();
