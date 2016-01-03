/**
Given two strings s and t, determine if they are isomorphic.

Two strings are isomorphic if the characters in s can be replaced to get t.

All occurrences of a character must be replaced with another character while preserving the order of characters. No two characters may map to the same character but a character may map to itself.

For example,
Given "egg", "add", return true.

Given "foo", "bar", return false.

Given "paper", "title", return true.

Note:
You may assume both s and t have the same length.
 */
/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isIsomorphic = function(s, t) {
    if(s.length !== t.length) {
        return false;
    }
    var len = s.length;
    var map = [];
    var mapedT = '';
    var tmpPair = {};
    var key;
    for (var i=0; i < len; i++) {
        key = searchMap(map, t[i]);
        if (key === -1) {
            tmpPair = {};
            tmpPair[s[i]] = t[i];
            map.push(tmpPair);
        } else if(key !== s[i]){
            return false;
        }
    }
    
    for (var j=0; j < len; j++) {
        mapedT += getMap(map, s[j]);
        if(mapedT[j] !== t[j]) {
            return false;
        }
    }
    return true;
};
function getMap(map, key) {
    var len = map.length;
    for(var i=0; i < len; i++) {
        if(typeof map[i][key] !== 'undefined') {
            return map[i][key];
        }
    }
}
function searchMap(map, value) {
    var len = map.length;
    for(var i=0; i < len; i++) {
        for(var key in map[i]) {
            if(map[i][key] == value) {
                return key;
            }
        }
    }
    return -1;
}