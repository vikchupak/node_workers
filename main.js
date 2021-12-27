const express = require("express");
const { getNthFibonacciNumber } = require("./utils/getNthFibonacciNumber");

const app = express();

app.get("/fibonacci", (req, res) => {
  const { n } = req.query; // object

  const result = getNthFibonacciNumber(parseInt(n));

  res.json(result);
});

const PORT = 8000;

app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`);
});
