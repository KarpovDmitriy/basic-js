const { NotImplementedError } = require('../lib');

/**
 * There's a list of file, since two files cannot have equal names,
 * the one which comes later will have a suffix (k),
 * where k is the smallest integer such that the found name is not used yet.
 *
 * Return an array of names that will be given to the files.
 *
 * @param {Array} names
 * @return {Array}
 *
 * @example
 * For input ["file", "file", "image", "file(1)", "file"],
 * the output should be ["file", "file(1)", "image", "file(1)(1)", "file(2)"]
 *
 */
function renameFiles(names) {
  const result = [];
  const used = {};

  for (let name of names) {
    if (!used[name]) {
      used[name] = 1;
      result.push(name);
    } else {
      const newName = `${name}(${used[name]})`;
      result.push(newName);
      used[name] += 1;
      used[newName] = 1;
    }
  }

  return result;
}

module.exports = {
  renameFiles
};
