const workerpool = require("workerpool");
const { getNthFibonacciNumber } = require("../utils/getNthFibonacciNumber");

workerpool.worker({ getNthFibonacciNumber });
