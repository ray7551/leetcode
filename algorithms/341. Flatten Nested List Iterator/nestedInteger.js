'use strict';

/**
 * @constructor
 * @param {number, Array} items must be a integer or an array of integer
 * */
let NestedInteger = function (items) {
  if (Number.isInteger(items)) {
    this.value = items;
    return;
  }
  if (!Array.isArray(items)) {
    throw new Error('NestedInteger only support integer and array of integer');
  }

  this.value = [];
  for (let item of items) {
    this.value.push(new NestedInteger(item));
  }
};

NestedInteger.prototype = {
  /**
   * Return true if this NestedInteger holds a single integer, rather than a nested list.
   * @return {boolean}
   */
  isInteger: function () {
    return typeof this.value === 'number';
  },

  /**
   * Return the single integer that this NestedInteger holds, if it holds a single integer
   * Return null if this NestedInteger holds a nested list
   * @return {number, null}
   */
  getInteger: function () {
    return this.isInteger() ? this.value : null;
  },

  /**
   * Return the nested list that this NestedInteger holds, if it holds a nested list
   * Return null if this NestedInteger holds a single integer
   * @return {NestedInteger[]}
   */
  getList: function () {
    return !this.isInteger() ? this.value : null;
  }
};

module.exports = NestedInteger;
