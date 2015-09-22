var codeA = 'A'.charCodeAt(0);

/** @return {number} */
var AToI = function(a) {
    a = a.toUpperCase();
    return a.charCodeAt(0) - codeA;
};

/** @return {string} */
var IToA = function(i) {
    return String.fromCharCode(i + codeA);
};
