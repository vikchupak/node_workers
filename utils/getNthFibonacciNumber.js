function getNthFibonacciNumber(n) {
  if (n <= 1) return n;
  return getNthFibonacciNumber(n - 1) + getNthFibonacciNumber(n - 2);
}

module.exports = { getNthFibonacciNumber };
