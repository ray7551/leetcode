/**
 * @author ray7551@gmail.com
 */
let topK = require('../../algorithms/347. Top K Frequent Elements/topKFrequent');

describe('topK', () => {
  it('should return topK frequently appeared number', () => {
    topK([1,1,1,2,2,3], 2).sort().should.eql([1,2].sort());
  });
  it('should return topK frequently appeared number', () => {
    topK([1,1,1,2,2,3,2,5,5,5,5], 2).sort().should.eql([5,2].sort());
  });
  it('should return topK frequently appeared number', () => {
    topK([1,1,1,2,2,3,2,3,4,5,6,6,6,4,2,23,12,4,3,2,3,5,1,2,5,12,4,23,2,1,2,2,3,3,2,2,1,1,5,5,3,2,2,3,2,2,12,9], 6, 6).sort().should.eql([2,3,1,5,4,6].sort());
  });
});
