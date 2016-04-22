/**
 * @param {number} n
 * @return {boolean}
 */
var isHappy = function (n) {
  var slow = n,
    fast = n;
  do {
    slow = next(slow);
    fast = next(next(fast));
    if (fast == 1) {
      return true;
    }
  } while (slow != fast);
  return false;
};

var next = function (n) {
  var ret = 0;
  while (n) {
    ret += Math.pow(n % 10, 2);
    n = Math.floor(n / 10);
  }
  return ret;
};
