
const deep_copy = object => {
    if (typeof(object) !== 'object')
        console.error('Bad type passed.', typeof(object));
    
    return JSON.parse(JSON.stringify(object));
}

module.exports = {
    deep_copy
};
