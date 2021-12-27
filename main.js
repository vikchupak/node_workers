const os = require("os");
const path = require("path");
const workerpool = require("workerpool");
const express = require("express");

const logicalCpus = os.cpus().length;

const pool = workerpool.pool(
  path.join(__dirname, "./workers/nthFibonacciNumberWorker.js"),
  {
    minWorkers: "max",
    maxWorkers: logicalCpus - 1,
    workerType: "thread",
  }
);

setInterval(() => console.log(pool.stats()), 500);

const app = express();

app.get("/fibonacci", (req, res) => {
  const { n } = req.query; // object

  pool
    .proxy()
    .then((worker) => worker.getNthFibonacciNumber(parseInt(n)))
    .then((result) => res.json(result))
    .catch(console.error);
  // .then(() => pool.terminate());
});

const PORT = 8000;

app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`);
});
