var should = require('should');
var MinStack = require('../../algorithms/155. Min Stack/minStack');

describe('minStack', function () {
  describe('constructor', function () {
    it('should return a minStack', function () {
      var stack = new MinStack();
      (stack.min === null).should.be.true();
      stack.diffStack.should.eql([]);
    });
  });
  
  it('should have basic functions', function () {
    var stack = new MinStack();
    stack.push(1);
    stack.top().should.equal(1);
    stack.getMin().should.equal(1);
    stack.pop();
    (stack.top() === null).should.be.true();
  });

  it('should save number in stack', function () {
    var stack = new MinStack();
    stack.push(1);
    stack.top().should.equal(1);
    stack.push(2);
    stack.top().should.equal(2);
    stack.push(-1);
    stack.top().should.equal(-1);
  });

  it('should get min', function () {
    var stack = new MinStack();
    stack.push(1);
    stack.push(2);
    stack.top().should.equal(2);
    stack.getMin().should.equal(1);
    stack.pop();
    stack.getMin().should.equal(1);
    stack.top().should.equal(1);
  });
});
