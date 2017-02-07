/**
 Given a non-empty array of integers, return the k most frequent elements.

 For example,
 Given [1,1,1,2,2,3] and k = 2, return [1,2].

 Note:
 You may assume k is always valid, 1 ≤ k ≤ number of unique elements.
 Your algorithm's time complexity must be better than O(n log n), where n is the array's size.
 */

let Heap = require('../../structures/Heap');
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
let topKFrequent = function (nums, k) {
  let frequency = getFrequency(nums);
  let minHeap = new Heap((a, b) => b.freq - a.freq, k);
  Object.keys(frequency).forEach(num => {
    minHeap.insert({
      num: num,
      freq: frequency[num]
    });
  });

  let result = [];
  for(let i=1; i <= minHeap.size; i++) {
    result.push(parseInt(minHeap._heap[i].num));
  }
  return result;
};

function getFrequency(nums) {
  let result = {};
  nums.forEach(num => {
    result[num] = result[num] ? result[num] + 1 : 1;
  });
  return result;
}


module.exports = topKFrequent;
