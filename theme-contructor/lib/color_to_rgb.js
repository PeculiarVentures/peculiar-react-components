/**
 * Transform color to RGB object
 * @example
 *  colorToRgb('#fff') // => { r: 255, g: 255, b: 255 }
 *  colorToRgb('0, 0, 0') // => { r: 0, g: 0, b: 0 }
 */
function colorToRgb(color) {
  if (color.includes('#')) {
    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    const regex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    const hex = color.replace(regex, (_, r, g, b) => r + r + g + g + b + b);
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

    if (!result) {
      throw new Error(`Wrong format for color: "${color}". Use "#fff" or "0, 0, 0" format.`);
    }

    return {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16),
    };
  }

  const result = color.split(',');

  if (result.length !== 3) {
    throw new Error(`Wrong format for color: "${color}". Use "#fff" or "0, 0, 0" format.`);
  }

  return {
    r: parseInt(result[0], 10),
    g: parseInt(result[1], 10),
    b: parseInt(result[2], 10),
  };
}

module.exports = {
  colorToRgb,
};
