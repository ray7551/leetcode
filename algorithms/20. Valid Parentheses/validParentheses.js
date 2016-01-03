/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function(s) {
    var stack = [],
        currentChar,
        start = ['(', '[', '{'],
        end = [')', ']', '}'],
        type;
    for(var i=0; i<s.length; i++) {
        currentChar = s.charAt(i);
        if(start.indexOf(currentChar) !== -1){
            stack.push(currentChar);
            continue;
        }
        type = end.indexOf(currentChar);
        if(type !== -1){
            if(stack[stack.length-1] === start[type]) {
                stack.pop();
            } else {
                return false;
            }
        }
    }
    return stack.length === 0;
};