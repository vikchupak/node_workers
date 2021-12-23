const os = require("os");
const workerpool = require("workerpool");
const { quickSort } = require("./utils/quickSort");
const { getRandomIntInclusive } = require("./utils/getRandomIntInclusive");

const logicalCpus = os.cpus().length;

console.log("logicalCpus: ", logicalCpus);

const array = Array(1000_000)
  .fill()
  .map(() => getRandomIntInclusive(0, 10_000_000));

console.log("array: ", array);

console.time("quickSort only");
console.log("sorted array: ", quickSort([...array]));
console.timeEnd("quickSort only");

const pool = workerpool.pool({ maxWorkers: 7, workerType: "thread" });

console.time("quickSort with worker pool");
pool
  .exec(quickSort, [[...array]])
  .then((result) => console.log("sorted array with worker pool: ", result))
  .catch((error) => console.error(error))
  .then(() => console.timeEnd("quickSort with worker pool"))
  .then(() => pool.terminate());
