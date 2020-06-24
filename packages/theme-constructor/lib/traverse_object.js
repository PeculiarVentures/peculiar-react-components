const traverse = require('traverse');

/**
 * Traverse object
 * @example
 *  traverseObject({
 *    name: 'John',
 *    car: {
 *      color: 'red',
 *    }
 *  }) // => { name: 'John', 'car-color': 'red' }
 */
function traverseObject(obj, prefix = '') {
  const traversedObj = traverse(obj);
  const newObj = {};

  traversedObj.paths().forEach((jsonPath) => {
    const val = traversedObj.get(jsonPath);

    if (typeof val !== 'object') {
      newObj[`${prefix}${jsonPath.join('-')}`] = val;
    }
  });

  return newObj;
}

module.exports = {
  traverseObject,
};
