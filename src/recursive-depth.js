const { NotImplementedError } = require('../lib');

/**
 * Implement class DepthCalculator with method calculateDepth
 * that calculates depth of nested array
 *
 * @example
 *
 * const depthCalc = new DepthCalculator();
 * depthCalc.calculateDepth([1, 2, 3, 4, 5]) => 1
 * depthCalc.calculateDepth([1, 2, 3, [4, 5]]) => 2
 * depthCalc.calculateDepth([[[]]]) => 3
 *
 */
class DepthCalculator {
  calculateDepth(arr) {
    if (!Array.isArray(arr)) return 0;
    let depth = 1;
    for (const el of arr) {
      if (Array.isArray(el)) {
        depth = Math.max(depth, 1 + this.calculateDepth(el));
      }
    }
    return depth;
  }
}

module.exports = {
  depthCalculator: new DepthCalculator(),
};
