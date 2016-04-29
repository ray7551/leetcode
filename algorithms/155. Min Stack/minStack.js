/**
 * Design a stack that supports push, pop, top, and retrieving the minimum element in constant time.

 push(x) -- Push element x onto stack.
 pop() -- Removes the element on top of the stack.
 top() -- Get the top element.
 getMin() -- Retrieve the minimum element in the stack.
 * */

'use strict';
/**
 * @constructor
 */
var MinStack = function () {
  this.min = null;
  this.diffStack = [];
};

/**
 * @param {number} x
 * @returns {void}
 */
MinStack.prototype.push = function (x) {
  var diff;
  if (size.call(this) === 0) {
    diff = 0;
    this.min = x;
  } else {
    diff = x - this.min;
    this.min = x < this.min ? x : this.min;
  }
  this.diffStack.push(diff);
};

/**
 * @returns {void}
 */
MinStack.prototype.pop = function () {
  var diff = this.diffStack.pop();
  if (size.call(this) === 0) {
    this.min = null;
    return;
  }
  this.min = diff < 0 ? this.min - diff : this.min;
};

/**
 * @returns {number, null}
 */
MinStack.prototype.top = function () {
  var diff = this.diffStack.slice(-1)[0];
  if (size.call(this) === 0) {
    return null;
  }
  return diff < 0 ? this.min : this.min + diff;
};

/**
 * @returns {number}
 */
MinStack.prototype.getMin = function () {
  return this.min;
};

var size = function () {
  return this.diffStack.length;
};

module.exports = MinStack;
