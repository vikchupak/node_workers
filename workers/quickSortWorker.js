const { parentPort, workerData, threadId } = require("worker_threads");
const { quickSort } = require("../utils/quickSort");

console.log(`threadId: ${threadId}. Process pid: ${process.pid}`);

parentPort.postMessage(quickSort(workerData));
