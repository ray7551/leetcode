let should = require('should');
let Heap = require('../../structures/Heap');

describe('Heap', () => {
  describe('constructor', () => {
    it('should run with no param', () => {
      let heap = new Heap();
      heap.should.hasOwnProperty('compare');
      (typeof heap.compare).should.equal('function');
      heap._heap.should.eql([]);
    });
    it('should accept compareFunction', () => {
      let compareFn = (a, b) => {
        return b - a;
      };
      let heap = new Heap(compareFn);
      heap.should.hasOwnProperty('compare');
      heap.compare.toString().should.equal(compareFn.toString());
      heap._heap.should.eql([]);
    });
  });

  describe('insert', () => {
    it('should insert to heap[1] if heap is empty', () => {
      let heap = new Heap();
      heap._heap.length.should.equal(0);
      heap.insert(9);
      heap._heap.length.should.equal(2);
      heap._heap.should.eql([, 9]);
      heap.rootNode.should.equal(9);
    });
    it('should insert multiple nodes properly', () => {
      let heap = new Heap();
      heap.insert(11);
      heap.insert(22);
      heap.insert(33);
      heap._heap.includes(11).should.be.true();
      heap._heap.includes(22).should.be.true();
      heap._heap.includes(33).should.be.true();
    });
    it('should can be chained', () => {
      let heap = new Heap();
      heap.insert(17).insert(16).insert(15).insert(14).should.equal(heap);
    });
    it('should keep rootNode the min node(min heap)', () => {
      let heap = new Heap((a, b) => b - a);
      heap.insert(9);
      heap.insert(10);
      heap.insert(12);
      heap.rootNode.should.equal(9);
      heap.insert(8);
      heap.rootNode.should.equal(8);
      heap.insert(14);
      heap.rootNode.should.equal(8);
      heap.insert(11);
      heap.rootNode.should.equal(8);
      heap.insert(13);
      heap.rootNode.should.equal(8);
      heap.insert(1);
      heap.rootNode.should.equal(1);
    });
    it('should keep rootNode the min node(min heap with capacity limit)', () => {
      let heap = new Heap((a, b) => b - a, 7);
      heap.insert(11);
      heap.insert(12);
      heap.insert(13);
      heap.insert(14);
      heap.insert(15);
      heap.insert(16);
      heap.insert(17);
      heap.rootNode.should.equal(11);
      heap.insert(9);
      heap._heap.includes(9).should.be.false();
      heap.rootNode.should.equal(11);
      heap.insert(19);
      heap._heap.includes(19).should.be.true();
      heap._heap.includes(11).should.be.false();
      heap.rootNode.should.equal(12);
      heap.size.should.equal(7);
      heap._heap.should.eql([, 12, 14, 13, 19, 15, 16, 17]);
    });
    it('should keep rootNode the max node(max heap)', () => {
      let heap = new Heap();
      heap.insert(9);
      heap.insert(13);
      heap.insert(10);
      heap.rootNode.should.equal(13);
      heap.insert(11);
      heap.rootNode.should.equal(13);
      heap.insert(16);
      heap.rootNode.should.equal(16);
      heap.insert(12);
      heap.rootNode.should.equal(16);
      heap.insert(14);
      heap.rootNode.should.equal(16);
      heap.insert(18);
      heap.rootNode.should.equal(18);
    });
    it('should keep rootNode the max node(max heap with capacity limit)', () => {
      let heap = new Heap(undefined, 7);
      heap.insert(17);
      heap.insert(16);
      heap.insert(15);
      heap.insert(14);
      heap.insert(13);
      heap.insert(12);
      heap.insert(11);
      heap.rootNode.should.equal(17);
      heap.insert(19);
      heap._heap.includes(19).should.be.false();
      heap.rootNode.should.equal(17);
      heap.size.should.equal(7);
      heap.insert(9);
      heap._heap.includes(9).should.be.true();
      heap._heap.includes(17).should.be.false();
      heap.rootNode.should.equal(16);
      heap.size.should.equal(7);
      heap._heap.should.eql([, 16, 14, 15, 9, 13, 12, 11]);
    });
  });
});
