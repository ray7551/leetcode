/**
Given an array of strings, group anagrams together.

For example, given: ["eat", "tea", "tan", "ate", "nat", "bat"], 
Return:

[
  ["ate", "eat","tea"],
  ["nat","tan"],
  ["bat"]
]
Note:
For the return value, each inner list's elements must follow the lexicographic order.
All inputs will be in lower-case.
 */
/**
 * @param {string[]} strs
 * @return {string[][]}
 */
var groupAnagrams = function(strs) {
    var code,
        retObj = {},
        retArr = [],
        i,c;
    for(i=0; i<strs.length; i++) {
        code = standardize(strs[i]);
        retObj[code] = retObj[code]||[];
        retObj[code].push(strs[i]);
    }
    for(var key in retObj) {
        retArr.push(retObj[key]);
    }
    for(i=0; i<retArr.length; i++) {
        retArr[i].sort();
    }
    
    return retArr;
};

var standardize = function(s) {
    var len = s.length;
    var count = [];
    var code = 0;
    for(var i=0; i<len; i++) {
        code = s.charCodeAt(i) - 97;
        count[code] ? count[code]++ : count[code] = 1;
    }
    return JSON.stringify(count);
};