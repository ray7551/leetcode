/**
 * Given a nested list of integers, implement an iterator to flatten it.

 Each element is either an integer, or a list -- whose elements may also be integers or other lists.

 Example 1:
 Given the list [[1,1],2,[1,1]],

 By calling next repeatedly until hasNext returns false, the order of elements returned by next should be: [1,1,2,1,1].

 Example 2:
 Given the list [1,[4,[6]]],

 By calling next repeatedly until hasNext returns false, the order of elements returned by next should be: [1,4,6].
 * */

'use strict';
var NestedInteger = require('nestedInteger');
/**
 * @constructor
 * @param {NestedInteger[]} nestedList
 */
var NestedIterator = function(nestedList) {
    this.nestedList = nestedList;
    this.current = 0;
    this.length = nestedList.length;
};


/**
 * @this NestedIterator
 * @returns {boolean}
 */
NestedIterator.prototype.hasNext = function() {
    return this.current <= this.length;
};

/**
 * @this NestedIterator
 * @returns {integer}
 */
NestedIterator.prototype.next = function() {
    next.call(this, this.nestedList);
};

var next = function(nestedList) {
    return nestedList.forEach(function*(item) {
        this.current++;
        if(typeof item === 'object') {
            next(item);
        } else {
            yield item;
        }
    });
};


var nestedList = new NestedInteger([1, 2, [3, 4], [5, 6, [7, 8, [9], 10], 11]]);
var i = new NestedIterator(nestedList), a = [];
while (i.hasNext()){
  a.push(i.next());
}


let arr = ['a', 'b', ['c', 'd'], [3, 5, [8, 9, [3], 9], 10]];
let iterator = arr[Symbol.iterator]();


const flatten = function(iterator) {
  let item = iterator.next();
  while (!item.done) {
    if(typeof item.value === 'object') {
      flatten(item.value[Symbol.iterator]());
    } else {
      console.log(item.value);
    }
    item = iterator.next();
  }
};

flatten(iterator);
