/**
 * @author ray7551@gmail.com
 */

// class Node {
//   constructor(index, value) {
//     this.value = value;
//     this.leftIndex = index * 2 ;
//     this.rightIndex = index * 2 + 1;
//     this.parentIndex = index >= 2 ? Math.floor(index / 2) : 0;
//     this.level = Math.floor(Math.log2(this.index)) + 1;
//     this.brothersIndex = {
//       min: Math.pow(2, this.level),
//       max: Math.pow(2, this.level + 1) - 1
//     };
//     // this.left = this.right = null;
//     // this.parent =
//   }
// }

/**
 * It is max heap by default
 * @usage:
 * let maxHeap = new Heap();
 * let maxHeap = new Heap(100, (a, b) => a.value - b.value);
 * let minHeap = new Heap(100, (a, b) => b-a);
 */
class Heap {
  constructor(compareFn = (a, b) => a - b, capacity = Heap.DEFAULT_HEAP_SIZE) {
    this.capacity = capacity;
    this._heap = [];
    if (typeof compareFn === 'function') {
      this.compare = compareFn;
    } else {
      throw Error('compareFn should be a function.');
    }
  }

  get size() {
    return this._heap.length - 1;
  }

  get rootNode() {
    return this._heap[1] ? this._heap[1] : null;
  }

  set rootNode(node) {
    this._heap[1] = node;
  }

  insert(obj) {
    // let node  = new Node(this.size + 1);
    if (this.rootNode === null) {
      this.rootNode = obj;
      return this;
    }
    if (this.size >= this.capacity) {
      if (this.compare(this.rootNode, obj) > 0) {
        this.rootNode = obj;
        this._down(1);
      }
    } else {
      this._heap.push(obj);
      this._up(this.size);
    }
    return this;
  }

  _down(index) {
    let childIndex = {left: index * 2, right: index * 2 + 1};
    let biggerChildIndex = null;
    if (childIndex.left > this.size) {
      return;
    }
    if (childIndex.left === this.size) {
      biggerChildIndex = childIndex.left;
    } else {
      biggerChildIndex = this.compare(this._heap[childIndex.left], this._heap[childIndex.right]) > 0 ? childIndex.left : childIndex.right;
    }
    if (this.compare(this._heap[biggerChildIndex], this._heap[index]) > 0) {
      this._swap(index, biggerChildIndex);
      this._down(biggerChildIndex);
    }
  }

  _up(index) {
    let parentIndex = index >= 2 ? Math.floor(index / 2) : 0;
    if (parentIndex > 0 && this.compare(this._heap[parentIndex], this._heap[index]) < 0) {
      this._swap(parentIndex, index);
      this._up(parentIndex);
    }
  }

  _swap(index1, index2) {
    let item1 = this._heap[index1];
    this._heap[index1] = this._heap[index2];
    this._heap[index2] = item1;
  }
}
Heap.DEFAULT_HEAP_SIZE = 1000;

module.exports = Heap;
