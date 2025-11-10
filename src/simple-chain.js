const { decorateObject } = require('../lib');
const { NotImplementedError } = require('../lib');

/**
 * Implement chainMaker object according to task description
 *
 */
const chainMaker = {
  chain: [],

  getLength() {
    return this.chain.length;
  },

  addLink(value) {
    if (arguments.length === 0) {
      this.chain.push('(  )');
    } else {
      this.chain.push(`( ${String(value)} )`);
    }
    return this;
  },

  removeLink(position) {
    if (
      typeof position !== 'number' ||
      !Number.isInteger(position) ||
      position <= 0 ||
      position > this.chain.length
    ) {
      this.chain = [];
      throw new Error("You can't remove incorrect link!");
    }

    this.chain.splice(position - 1, 1);
    return this;
  },

  reverseChain() {
    this.chain.reverse();
    return this;
  },

  finishChain() {
    const result = this.chain.join('~~');
    this.chain = [];
    return result;
  },
};

module.exports = {
  chainMaker,
};
