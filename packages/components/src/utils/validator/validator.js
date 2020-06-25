import regExps from './reg_exps';

/**
 * Show 'console.error'
 * @param {*} type - Type name, will be show in error text
 * @returns {boolean}
 */
function error(type) {
  console.error(`Type '${type}' not found`);

  return false;
}

/**
 * Check on date is real
 * @param {number} year - Year value
 * @param {number} month - Mouth value
 * @param {number} day - Day value
 * @returns {boolean}
 */
function isRealDate(year, month, day) {
  const d = new Date(year, month - 1, day);

  return (
    d.getFullYear() === year &&
    d.getMonth() === month - 1 &&
    d.getDate() === day
  );
}

/**
 * Checking the value of the mask
 * @param {string|number} value - Value for check
 * @param {string|function} type - Mask type
 * @returns {boolean}
 */
function validateByType(value, type) {
  if (!type) {
    return error(type);
  }

  if (typeof type === 'function') {
    return type(value);
  }

  if (!regExps[type]) {
    return error(type);
  }

  switch (type) {
    case 'date': {
      if (typeof value !== 'string') {
        return false;
      }
      const splited = value.split('-');

      return (
        regExps[type].test(value) &&
        isRealDate(Number(splited[0]), Number(splited[1]), Number(splited[2]))
      );
    }

    default:
      return regExps[type].test(value);
  }
}

/**
 *
 * @param {string|number} value - Value for check
 * @param {array<string|function>} types - Mask types
 * @param {boolean} ignoreStartAndEndSpaces - Trim value spaces
 * @returns {boolean}
 */
export default function validator(value, types, ignoreStartAndEndSpaces) {
  if (!Array.isArray(types)) {
    console.error('Argument \'types\' must be an \'array\'');

    return false;
  }

  const preparedValue = ignoreStartAndEndSpaces ? value.trim() : value;

  for (let i = 0; i < types.length; i += 1) {
    if (!validateByType(preparedValue, types[i])) {
      return false;
    }
  }

  return true;
}
