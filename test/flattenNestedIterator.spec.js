var should = require('should');
var NestedInteger = require('../algorithms/341. Flatten Nested List Iterator/nestedInteger');
var NestedIterator = require('../algorithms/341. Flatten Nested List Iterator/nestedIterator');
// []
// [1]
// [[1]]
describe('#Constructor', function () {
  context('when given NestedInteger[]', function () {
  });
});

describe('#hasNext', function () {
  it('should return true if iterator has next', function () {
    var nestedList = new NestedInteger([1, 2, [3, 4]]);
    var iterator = new NestedIterator(nestedList.getList());
    iterator.hasNext().should.be.true();
    iterator.next();
    iterator.hasNext().should.be.true();
    iterator.next();
    iterator.hasNext().should.be.true();
  });
  it('should return true if iterator has no next', function () {
    var nestedList = new NestedInteger([1]);
    var iterator = new NestedIterator(nestedList.getList());
    iterator.hasNext().should.be.true();
    iterator.next();
    iterator.hasNext().should.be.false();
  });
});

describe('#next', function () {
  context('when iterator has next', function () {
    it('should return number', function () {
      var nestedList = new NestedInteger([1, 2, [3, 4]]);
      var iterator = new NestedIterator(nestedList.getList());
      iterator.next().should.equal(1);
      iterator.next().should.equal(2);
      iterator.next().should.equal(3);
      iterator.next().should.equal(4);
    });
    it('should return number(single item)', function () {
      var nestedList = new NestedInteger([[1]]);
      var iterator = new NestedIterator(nestedList.getList());
      iterator.next().should.equal(1);
    });
  });

  /*context('when iterator has no next', function () {
    it('should return null(single item)', function () {
      var nestedList = new NestedInteger([1]);
      var iterator = new NestedIterator(nestedList.getList());
      iterator.next();
      (iterator.next() === null).should.be.true();
    });
    it('should return null(multiple item)', function () {
      var nestedList = new NestedInteger([1, 2]);
      var iterator = new NestedIterator(nestedList.getList());
      iterator.next();
      iterator.next();
      (iterator.next() === null).should.be.true();
    });
  });*/
});

describe('basic', function () {
  it('should flatten nested array', function () {
    var nestedList = new NestedInteger([1, 2, [3, 4], [5, 6, [7, 8, [9], 10], 11]]);
    var i = new NestedIterator(nestedList.getList()), a = [];
    while (i.hasNext()){
      a.push(i.next());
    }
    a.should.eql([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
  });
});
