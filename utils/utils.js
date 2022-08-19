function isString(...args) {
    for (let arg of args) {
        if (typeof arg !== 'string') return false;
    }
    return true;
}

function isInt(value) {
    return !isNaN(value) &&
        parseInt(Number(value)) == value &&
        !isNaN(parseInt(value, 10));
}

function isBool(value) {
    return typeof value === 'boolean'
}

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