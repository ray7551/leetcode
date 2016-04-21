/**
 Design and implement a data structure for Least Recently Used (LRU) cache. It should support the following operations: get and set.

 get(key) - Get the value (will always be positive) of the key if the key exists in the cache, otherwise return -1.
 set(key, value) - Set or insert the value if the key is not already present. When the cache reached its capacity, it should invalidate the least recently used item before inserting a new item.
 */

(function (exports) {
  'use strict';

  /**
   * @constructor
   * @param {number,string} key
   * @param val
   */
  var Node = function (key, val) {
    this.key = key;
    this.val = val;
    this.prev = null;
    this.next = null;
  };

  /**
   * @constructor
   * @property head
   * @property tail the least recently used key, at linked list tail
   */
  var LRUCache = function (capacity) {
    if (!Number.isInteger(capacity) || capacity <= 0) {
      throw new Error('Capacity should >= 1');
    }

    this.capacity = capacity;
    this.list = {};
    this.head = null;
    this.tail = null;
  };

  /**
   * @param {number, string} key
   * @returns {number, string}
   */
  LRUCache.prototype.get = function (key) {
    var currentNode = this.list[key];
    if (!this.list.hasOwnProperty(key)) {
      return -1;
    }

    this.moveToHead(currentNode);

    return currentNode.val;
  };

  LRUCache.prototype.unlink = function (node) {
    if (node.prev) {
      node.prev.next = node.next;
    }
    if (node.next) {
      node.next.prev = node.prev;
    }
    if (this.tail === node) {
      this.tail = node.prev;
    }
    if (this.head === node) {
      this.head = node.next;
    }
  };

  /**
   * @param {number, string} key
   * @param {number, string} value
   * @returns {void}
   */
  LRUCache.prototype.set = function (key, value) {
    if (this.list.hasOwnProperty(key)) {
      this.list[key].val = value;
      this.moveToHead(this.list[key]);
      return;
    }

    if (this.size() === this.capacity) {
      var oldTailKey = this.tail.key;
      this.unlink(this.tail);
      delete this.list[oldTailKey];
    }

    this.list[key] = new Node(key, value);
    this.addAtBegin(this.list[key]);
  };

  LRUCache.prototype.moveToHead = function (node) {
    if (this.head !== node) {
      this.unlink(node);
      this.addAtBegin(node);
    }
  };

  LRUCache.prototype.addAtBegin = function (node) {
    if (this.head === null) {
      this.head = this.tail = node;
    } else if (this.head !== node) {
      node.next = this.head;
      this.head.prev = node;
    }
    this.head = node;
  };


  LRUCache.prototype.size = function () {
    return Object.keys(this.list).length;
  };

  exports.LRUCache = LRUCache;

})(typeof window === 'undefined' ? module.exports : window);

