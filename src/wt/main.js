import { Worker } from "worker_threads";
import os from "os";
import path from "path";

const performCalculations = async () => {
  const cores = os.cpus().length;
  const workerPath = path.join(import.meta.dirname, "worker.js");
  const workerPromises = [];

  for (let i = 0; i < cores; i++) {
    const workerData = 10 + i;

    const workerPromise = new Promise((resolve, reject) => {
      const worker = new Worker(workerPath);

      worker.postMessage(workerData);

      worker.on("message", (message) => {
        worker.terminate();
        resolve({ status: "resolved", data: message.data });
      });

      worker.on("error", (err) => {
        worker.terminate();
        resolve({ status: "error", data: null });
      });
    });

    workerPromises.push(workerPromise);
  }

  try {
    const results = await Promise.all(workerPromises);
    console.log(results);
  } catch (error) {
    console.error(error);
  }
};

await performCalculations();
