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

    moveToHead.call(this, currentNode);
    return currentNode.val;
  };

  /**
   * @param {number, string} key
   * @param {number, string} value
   * @returns {void}
   */
  LRUCache.prototype.set = function (key, value) {
    if (this.list.hasOwnProperty(key)) {
      this.list[key].val = value;
      moveToHead.call(this, this.list[key]);
      return;
    }

    if (this.size() === this.capacity) {
      deleteTail.call(this);
    }

    this.list[key] = new Node(key, value);
    addAtBegin.call(this, this.list[key]);
  };

  LRUCache.prototype.size = function () {
    return Object.keys(this.list).length;
  };

  var unlink = function (node) {
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

  var moveToHead = function (node) {
    if (this.head !== node) {
      unlink.call(this, node);
      addAtBegin.call(this, node);
    }
  };

  var addAtBegin = function (node) {
    if (this.head === null) {
      this.head = this.tail = node;
    } else if (this.head !== node) {
      node.next = this.head;
      this.head.prev = node;
    }
    this.head = node;
  };

  var deleteTail = function () {
    var oldTailKey = this.tail.key;
    unlink.call(this, this.tail);
    delete this.list[oldTailKey];
  };

  exports.LRUCache = LRUCache;

})(typeof window === 'undefined' ? module.exports : window);

