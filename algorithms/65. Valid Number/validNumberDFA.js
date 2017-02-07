/**
 Validate if a given string is numeric.

 Some examples:
 "0" => true
 " 0.1 " => true
 "abc" => false
 "1 a" => false
 "2e10" => true
 Note: It is intended for the problem statement to be ambiguous. You should gather all requirements up front before implementing one.

 Update (2015-02-10):
 The signature of the C++ function had been updated. If you still see your function signature accepts a const char * argument, please click the reload button  to reset your code definition.
 */

'use strict';

/**
 * @param {string} s
 * @return {boolean}
 */
const isNumber = (s) => {
  /** This transform table is DFA of regex [-+]?((\d+\.?)|(\d*\.\d+))(e[-+]?\d+)?
   * You can get it from http://hackingoff.com/compilers/regular-expression-to-nfa-dfa
   * There are 4 type of input chars:
   * s -+
   * d .
   * n 0-9
   * e eE
   */
  const transformTable = {
    0: {s:1, d:3, n:2},
    1: {     d:3, n:2},
    2: {     d:4, n:2, e:5},
    3: {          n:6},
    4: {          n:6, e:5},
    5: {s:7,      n:8},
    6: {          n:6, e:5},
    7: {          n:8},
    8: {          n:8}
  };
  const endStates = [2, 4, 6, 8];
  const strArr = Array.from(s.trim(s));

  let nextState = null;
  for(let char of strArr) {
    let charType = getCharType(char);
    if (!charType) {
      return false;
    }

    nextState = nextState!==null ?
        transformTable[nextState][charType] :
        transformTable[0][charType];
    if (nextState === undefined) {
      return false;
    }
  }

  return endStates.indexOf(nextState) !== -1;
};

const getCharType = (c) => {
  const code = c.charCodeAt(0);
  // -+
  if(code === 43 || code === 45) {
    return 's';
  }
  // .
  if(code === 46) {
    return 'd';
  }
  // 0-9
  if(code >= 48 && code <= 57) {
    return 'n';
  }
  // eE
  if(code === 69 || code === 101) {
    return 'e';
  }
  return false;
};

module.exports = isNumber;
