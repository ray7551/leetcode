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
    // notice: '004', '0.1', '.2', '3.', '-1.', '46.e3', .3e3, ' 005047e+6' are valid numbers
    return /^\s*[-+]?((\d+\.?)|(\d*\.\d+))(e[-+]?\d+)?\s*$/i.test(s);
    // return !isNaN(s) && !!s.replace(/\s/g,'');
};

module.exports = isNumber;