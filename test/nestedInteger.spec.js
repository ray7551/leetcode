var should = require('should');
var NestedInteger = require('../algorithms/341. Flatten Nested List Iterator/nestedInteger');

// describe('#Constructor', function () {
//   context('when given an Integer', function () {

//   });
// });

//var nestedList = new NestedInteger([1, 2, [3, 4], [5, 6, [7, 8, [9], 10], 11]]);
describe('#isInteger()', function () {
  context('when given an Integer', function () {
    it('should return true', function () {
      var nestedList = new NestedInteger(1);
      nestedList.isInteger().should.be.true();
    });
  });
  context('when given a Flatten array', function () {
    it('should return false', function () {
      var nestedList = new NestedInteger([1]);
      nestedList.isInteger().should.be.false();
    });
    it('should return false', function () {
      var nestedList = new NestedInteger([1, 4]);
      nestedList.isInteger().should.be.false();
    });
  });
});

describe('#getInteger()', function () {
  context('when given an Integer', function () {
    it('should return integer', function () {
      var nestedList = new NestedInteger(4);
      nestedList.getInteger().should.equal(4);
    });
  });
  context('when given a Flatten array', function () {
    it('should return null', function () {
      var nestedList = new NestedInteger([1]);
      (nestedList.getInteger() === null).should.be.true();
    });
    it('should return null', function () {
      var nestedList = new NestedInteger([1, 4]);
      (nestedList.getInteger() === null).should.be.true();
    });
  });
});

describe('#getList()', function () {
  context('when given an Integer', function () {
    it('should return null', function () {
      var nestedList = new NestedInteger(4);
      (nestedList.getList() === null).should.be.true();
    });
  });

  context('when given a Flatten array', function () {
    it('should return NestedInteger[]', function () {
      var nestedList = new NestedInteger([1]);
      var list = nestedList.getList();
      list.should.be.instanceof(Array).and.have.lengthOf(1);
      list[0].should.be.instanceof(NestedInteger);
    });
    it('should return NestedInteger[]', function () {
      var nestedList = new NestedInteger([1, 4]);
      var list = nestedList.getList();
      list.should.be.instanceof(Array).and.have.lengthOf(2);
      list[0].should.be.instanceof(NestedInteger);
      list[1].should.be.instanceof(NestedInteger);
    });
  });

  context('when given a Nested array', function () {
    it('should return nested NestedInteger[]', function () {
      var nestedList = new NestedInteger([[1]]);
      var list = nestedList.getList();
      list.should.be.instanceof(Array).and.have.lengthOf(1);
      list[0].should.be.instanceof(NestedInteger);
      var innerList = list[0].getList();
      innerList.should.be.instanceof(Array).and.have.lengthOf(1);
      innerList[0].should.be.instanceof(NestedInteger);
    });
    it('should return nested NestedInteger[]', function () {
      var nestedList = new NestedInteger([1, [2, 4]]);
      var list = nestedList.getList();
      list.should.be.instanceof(Array).and.have.lengthOf(2);
      list[1].should.be.instanceof(NestedInteger);
      var innerList = list[1].getList();
      innerList.should.be.instanceOf(Array).and.have.lengthOf(2);
      innerList[1].should.be.instanceOf(NestedInteger);
    });
  });
});

