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


module.exports = {
    isString,
    isInt,
    isBool
}