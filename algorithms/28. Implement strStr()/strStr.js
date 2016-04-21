/**
Implement strStr().

Returns the index of the first occurrence of needle in haystack, or -1 if needle is not part of haystack.
 */

/**
 * @param {string} haystack
 * @param {string} needle
 * @return {number}
 */
var strStr = function(haystack, needle) {
    var i = haystack.indexOf(needle.charAt(0));
    if(i === -1) {
        return -1;
    }
    if(needle.length === 0) {
        return i;
    }
    for(; i<haystack.length; i++) {
        if(haystack.slice(i, needle.length+i) === needle) {
            return i;
        }
    }
    return -1;
};