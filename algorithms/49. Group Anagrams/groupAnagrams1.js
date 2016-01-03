var groupAnagrams = function(strs) {
    var code,
        retObj = {},
        retArr = [],
        i;
    strs = strs.sort();
    for(i=0; i<strs.length; i++) {
        code = strs[i].split('').sort().join('');
        if(retObj[code]) {
            retObj[code].push(strs[i]);
        } else {
            retObj[code] = [strs[i]];
        }
    }
    for(var key in retObj) {
        retArr.push(retObj[key]);
    }
    
    return retArr;
};