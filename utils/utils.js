/**
 * Check if a set of values are string
 * @param  {...any} args 
 * @returns true if all values are string else false
 */
function isString(...args) {
    for (let arg of args) {
        if (typeof arg !== 'string') return false;
    }
    return true;
}


/**
 * Check if a value is an integer
 * @param {*} value 
 * @returns true if the value is an integer else false
 */
function isInt(value) {
    return !isNaN(value) &&
        parseInt(Number(value)) == value &&
        !isNaN(parseInt(value, 10));
}

/**
 * Check if a value is a boolean
 * @param {*} value 
 * @returns true if the value is a boolean else false
 */
function isBool(value) {
    return typeof value === 'boolean'
}


/**
 * Shuffles a given array
 * @param {*} array 
 */
function shuffleArray(array) {
    for (let i = array.length - 1 ; i > 0 ; i--) {
        let j = Math.floor(Math.random() * (i+1));
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}


module.exports = {
    isString,
    isInt,
    isBool,
    shuffleArray
}