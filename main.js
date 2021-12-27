const path = require("path");
const { Worker, threadId } = require("worker_threads");
const { getRandomIntInclusive } = require("./utils/getRandomIntInclusive");
const { quickSort } = require("./utils/quickSort");

const array = Array(1_000_000)
  .fill()
  .map(() => getRandomIntInclusive(0, 10_000_000));

console.log("array: ", array);

function runQuickSortWorker(workerData) {
  return new Promise((resolve, reject) => {
    const quickSortWorker = new Worker(
      path.join(__dirname, "./workers/quickSortWorker.js"),
      { workerData }
    );

    quickSortWorker.on("message", resolve);
    quickSortWorker.on("error", reject);
    quickSortWorker.on("exit", (code) => {
      if (code !== 0)
        reject(new Error(`Worker stopped with exit code ${code}`));
    });
  });
}

async function threadedQuickSort(array) {
  if (array.length < 2) {
    return array;
  }
  const pivot = array[0];
  const less = [];
  const greater = [];

  for (let i = 1; i < array.length; i++) {
    if (pivot > array[i]) {
      less.push(array[i]);
    } else {
      greater.push(array[i]);
    }
  }

  const sortedPartitions = await Promise.all([
    runQuickSortWorker(less),
    runQuickSortWorker(greater),
  ]);

  return sortedPartitions[0].concat(pivot, sortedPartitions[1]);
}

console.log(`mainThreadId: ${threadId}. Process pid: ${process.pid}`);

console.time("quickSort");
console.log("Sorted array: ", quickSort([...array]));
console.timeEnd("quickSort");

async function runThreadedQuickSort() {
  console.time("threadedQuickSort");
  console.log("Sorted threaded array: ", await threadedQuickSort([...array]));
  console.timeEnd("threadedQuickSort");
}

runThreadedQuickSort().catch((error) => console.error(error));
