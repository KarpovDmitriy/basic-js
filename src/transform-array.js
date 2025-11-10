const { NotImplementedError } = require('../lib');

/**
 * Create transformed array based on the control sequences that original
 * array contains
 *
 * @param {Array} arr initial array
 * @returns {Array} transformed array
 *
 * @example
 *
 * transform([1, 2, 3, '--double-next', 4, 5]) => [1, 2, 3, 4, 4, 5]
 * transform([1, 2, 3, '--discard-prev', 4, 5]) => [1, 2, 4, 5]
 *
 */
function transform(arr) {
  if (!Array.isArray(arr)) {
    throw new Error("'arr' parameter must be an instance of the Array!");
  }

  const result = [];
  const skipped = new Set();

  for (let i = 0; i < arr.length; i++) {
    const item = arr[i];

    switch (item) {
      case '--discard-next':
        if (i + 1 < arr.length) {
          skipped.add(i + 1);
          i++;
        }
        break;

      case '--discard-prev':
        if (i > 0 && !skipped.has(i - 1)) {
          result.pop();
        }
        break;

      case '--double-next':
        if (i + 1 < arr.length) {
          result.push(arr[i + 1]);
        }
        break;

      case '--double-prev':
        if (i > 0 && !skipped.has(i - 1)) {
          result.push(arr[i - 1]);
        }
        break;

      default:
        if (!skipped.has(i)) {
          result.push(item);
        }
        break;
    }
  }

  return result;
}

module.exports = {
  transform
};
