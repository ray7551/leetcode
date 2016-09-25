/**
 * @param {number} n
 * @return {string[]}
 * 1: 11
 * 2: 2112 2211
 * 3: 321123 322113 211233 332112 332211 
 * 4: 43211234 43221134 42112334 43321124 43322114 44321123 32112344 44322113 32211344 44211233 21123344 44332112 33211244  44332211

左括号剩余 = 右括号剩余，加左括号

start: left===right===n
processing: left<=right
1. if let===right left-1 else
2. left-1 goto 
3. 
end: left===right===0
 n=2                          left    right  2  2
 (                            1       2
 ((                           0       2
 (()                          0       1
 (())                         0       0

                              2       2
 (                            1       2
 ()                           1       1
 ()(                          0       1
 ()()                         0       0

 */
var generateParenthesis = function(n) {
  var ret = [];
  ret = parenthes(n, n, '');
  return ret;
};

var cache = new Map();

/**
 * @return Array
 */
var parenthes = function(left, right, str) {
  var list = [];
  var leftKey = left-1 + '-' + right;
  var rightKey = left + '-' + right-1;
  var pushList = function(left, right, character) {
    //var key = left + '-' + right;
    //if(!cache.has(key)) {
    //  cache.set(key, parenthes(left, right, str + character));
    //}
    //list.push(key, cache.get(key));
    parenthes(left, right, str + character);
    console.log(character);
  };

  if (left === right) {
    if (left === 0) {
      console.log('end point: ', str);
      return str;
    }

    pushList(left - 1, right, '(');
  } else if (left < right) {
    if (left !== 0) {
      pushList(left - 1, right, '(');
      pushList(left, right - 1, ')');
    } else {
      pushList(left, right - 1, ')');
    }
  }
  console.log(list);
  return list;
};

generateParenthesis(2);