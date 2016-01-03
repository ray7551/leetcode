/**
Given two strings s and t, write a function to determine if t is an anagram of s.

For example,
s = "anagram", t = "nagaram", return true.
s = "rat", t = "car", return false.

Note:
You may assume the string contains only lowercase alphabets.

Follow up:
What if the inputs contain unicode characters? How would you adapt your solution to such case?
 */


/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isAnagram = function(s, t) {
    var as = standardize(s);
    var currentChar;
    
    if(s.length !== t.length) {
        return false;
    }
    
    for(var i=0; i<t.length; i++) {
        currentChar = t.charAt(i);
        if(!as.hasOwnProperty(currentChar) || as[currentChar]===0){
            return false;
        } else {
            as[currentChar]--;
        }
    }
    return true;
};

var standardize = function(s) {
    var len = s.length;
    var ret = {};
    var code = 0;
    for(var i=0; i<len; i++) {
        code = s.charAt(i);
        ret.hasOwnProperty(code) ? ret[code]++ : ret[code] = 1;
    }
    return ret;
};