function quickSort(array) {
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

  return quickSort(less).concat(pivot, quickSort(greater));
}

module.exports = { quickSort };
