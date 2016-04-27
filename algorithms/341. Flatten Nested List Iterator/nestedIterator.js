/**
 * Given a nested list of integers, implement an iterator to flatten it.

 Each element is either an integer, or a list -- whose elements may also be integers or other lists.

 Example 1:
 Given the list [[1,1],2,[1,1]],

 By calling next repeatedly until hasNext returns false, the order of elements returned by next should be: [1,1,2,1,1].

 Example 2:
 Given the list [1,[4,[6]]],

 By calling next repeatedly until hasNext returns false, the order of elements returned by next should be: [1,4,6].
 **/

'use strict';
/**
 * @constructor
 * @param {NestedInteger[]} nestedList
 */
var NestedIterator = function (nestedList) {
  this.nestedList = nestedList;
  this.flattenIterator = flattenIteratorGen(this.nestedList);
  this.iteratorStatus = this.flattenIterator.next();
  this.last2Value = [];
  this.last2Value.push(this.iteratorStatus.value);
};

/**
 * @this NestedIterator
 * @returns {boolean}
 */
NestedIterator.prototype.hasNext = function () {
  return !this.iteratorStatus.done;
};

/**
 * @this NestedIterator
 * @returns {number}
 */
NestedIterator.prototype.next = function () {
  this.iteratorStatus = this.flattenIterator.next();
  if (this.last2Value.length <= 1) {
    this.last2Value.push(this.iteratorStatus.value);
    return this.last2Value[0];
  }

  if (this.hasNext()) {
    this.last2Value.push(this.iteratorStatus.value);
    this.last2Value.shift();
    return this.last2Value[0];
  } else {
    return this.last2Value[1];
  }
};

const flattenIteratorGen = function*(nestedList) {
  for (let item of nestedList) {
    if (item.isInteger()) {
      yield item.getInteger();
    } else {
      yield *flattenIteratorGen(item.getList());
    }
  }
};

module.exports = NestedIterator;

/**
 * Your NestedIterator will be called like this:
 * var i = new NestedIterator(nestedList), a = [];
 * while (i.hasNext()) a.push(i.next());
 */
