/**
 * Created by Ray on 2016/4/26.
 */
'use strict';
const arr = [0, 1, [2, 3], [4, 5, [8, 9, [3], 9], 10]];

const makeFlattenIterator = function* (arr) {
  for(let item of arr) {
    if(typeof item === 'object') {
      yield *makeFlattenIterator(item);
    } else {
      yield item;
    }
  }
};
const flattenIterator = makeFlattenIterator(arr);
let t = flattenIterator.next();
while(!t.done) {
  console.log(t.value);
  t = flattenIterator.next();
}

/**
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
flatten(arrIterator);
 */
