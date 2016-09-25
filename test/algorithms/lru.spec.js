var should = require('should');
var LRU = require('../../algorithms/146. LRU Cache/lru').LRUCache;


var shallowCopy = function (src, dst) {
  dst = dst || {};
  for(var key in src) {
    if (src.hasOwnProperty(key)) {
      dst[key] = src[key];
    }
  }
  return dst;
};


describe('Cache', function() {
  it('should accept a capacity that >= 1', function(){
    var cache = new LRU(3);
    cache.capacity.should.equal(3);
  });
  it('should throw error if capacity not >= 1', function(){
    (function() {
      new LRU(0);
    }).should.throw();
    (function() {
      new LRU('3');
    }).should.throw();
    (function() {
      new LRU(1);
    }).should.not.throw();
  });

  it('should return current size', function() {
    var cache = new LRU(2);
    cache.size().should.equal(0);
    cache.set(1, 1);
    cache.size().should.equal(1);
    cache.set(2, 2);
    cache.size().should.equal(2);
    cache.set(3, 3);
    cache.size().should.equal(2);
  });

  it('should get and set', function() {
    var cache = new LRU(10);
    cache.set('key', 'value');
    cache.get('key').should.equal('value');
  });

  it('should renew a existed cache', function() {
    var cache = new LRU(2);
    cache.set(2, 1);
    cache.head.should.equal(cache.list[2]);
    cache.set(2, 2);
    cache.get(2).should.equal(2);
  });

  it('should return -1 if key not exsit', function() {
    var cache = new LRU(2);
    cache.get('key').should.equal(-1);
    cache.set('key', 'v');
    cache.get('key2').should.equal(-1);
  });
});

describe('Linked list', function() {
  it('should empty after init', function() {
    var cache = new LRU(1);
    cache.list.should.eql({});
  });

  describe('Head', function() {
    it('should be null after init', function() {
      var cache = new LRU(1);
      (cache.head === null).should.be.true();
    });

    /*
    it('should changed when get tail item', function() {
      var cache = new LRU(2);
      cache.set(9,10);
      cache.set(2,19); // 2=>9
      cache.head.should.equal(cache.list[2]);
      cache.get(9); // 9=>2
      cache.head.should.equal(cache.list[9]);
      cache.head.next.should.equal(cache.list[2]);
    });
    it('should changed when set tail item', function() {}
    */

    it('should be recently used item(single item)', function() {
      var cache = new LRU(1);
      cache.set('key', 'val');
      cache.head.should.equal(cache.list.key);
      cache.set('key2', 'val2');
      cache.head.should.equal(cache.list['key2']);
    });
    it('should be recently used item(multiple items)', function() {
      // capacity:2 directives: set(2), set(1), get(2), set(4), get(1), get(2)
      var cache = new LRU(2);
      cache.set(2, 2);
      cache.head.should.equal(cache.list[2]);
      cache.set(1, 1);
      cache.head.should.equal(cache.list[1]); // 1=>2
      cache.get(2).should.equal(2);
      cache.head.should.equal(cache.list[2]); // 2=>1
      cache.set(4, 4);
      cache.head.should.equal(cache.list[4]); // 4=>2
      cache.get(1).should.equal(-1);
      cache.head.should.equal(cache.list[4]);
      cache.get(2);
      cache.head.should.equal(cache.list[2]);
    });

    it('should have no prev', function() {
      var cache = new LRU(1);
      cache.set(3, 5);
      (cache.head.prev === null).should.be.true();
    });
  });

  describe('Tail', function() {
    it('should be null after init', function() {
      var cache = new LRU(1);
      (cache.tail === null).should.be.true();
    });

    it('should not be changed when set head item', function() {
      var cache = new LRU(2);
      cache.set(9, 10);
      cache.set(2, 19); // 2=>9
      cache.tail.should.equal(cache.list[9]);
      var t = shallowCopy(cache.tail);
      cache.set(2, 2); // 2=>9
      // because object tail has circular reference, it have to be compared by every property
      cache.tail.should.eql(t);

      cache.set(5, 25);
    });

    it('should not be changed when get head item', function() {
      var cache = new LRU(2);
      cache.set(9,10);
      cache.set(2,19); // 2=>9
      cache.tail.should.equal(cache.list[9]);
      var t = shallowCopy(cache.tail);
      cache.get(2); // 2=>9
      // because object tail has circular reference, it have to be compared by every property
      cache.tail.should.eql(t);

      cache.set(5, 25);
    });

    it('should be changed when set tail item', function() {
      var cache = new LRU(5);
      cache.set(1, 1);
      cache.set(2, 2);
      cache.set(3, 3); // 3=>2=>1
      cache.tail.should.equal(cache.list[1]);
      cache.set(1, 11); // 1=>3=>2
      cache.tail.should.equal(cache.list[2]);
    });

    it('should be changed when set new item under full cache(multiple items)', function() {
      var cache = new LRU(3);
      cache.set(1, 1);
      cache.set(2, 2); // 2=>1
      cache.set(3, 3); // 3=>2=>1
      cache.tail.should.equal(cache.list[1]);
      cache.set(4, 4); // 4=>3=>2
      cache.tail.should.equal(cache.list[2]);
    });
    it('should be changed when set new item under full cache(single item)', function () {
      var cache = new LRU(1);
      cache.set(2,2);
      cache.tail.should.equal(cache.list[2]);
      cache.get(2);
      cache.tail.should.equal(cache.list[2]);
      cache.set(3,3);
      cache.tail.should.equal(cache.list[3]);
      cache.get(2);
      cache.get(3);
      cache.tail.should.equal(cache.list[3]);
    });

    it('should be least recently used item(single item)', function() {
      var cache = new LRU(1);
      cache.set('key', 'val');
      cache.tail.should.equal(cache.list.key);
      cache.set('key2', 'val2');
      cache.tail.should.equal(cache.list['key2']);
    });
    it('should be least recently used item(multiple items)', function() {
      // capacity:2 directives: set(2), set(1), get(2), set(4), get(1), get(2)
      var cache = new LRU(2);
      cache.set(2, 2);
      cache.tail.should.equal(cache.list[2]);
      cache.set(1, 1); // 1=>2
      cache.tail.should.equal(cache.list[2]);
      cache.get(2).should.equal(2); // 2=>1
      cache.tail.should.equal(cache.list[1]);
      cache.set(4, 4); // 4=>2
      cache.tail.should.equal(cache.list[2]);
      cache.get(1).should.equal(-1);
      cache.tail.should.equal(cache.list[2]);
      cache.get(2).should.equal(2);
      cache.tail.should.equal(cache.list[4]);
    });

    it('should have no next', function() {
      var cache = new LRU(1);
      cache.set(3, 5);
      (cache.tail.next === null).should.be.true();
    });

  });

});

