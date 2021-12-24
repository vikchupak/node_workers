const { parentPort, workerData, threadId } = require("worker_threads");
const { quickSort } = require("../utils/quickSort");

console.log("threadId: ", threadId);

parentPort.postMessage(quickSort(workerData));
