import fs from 'fs';
import path from 'path';
import defaultOptions from './defaultOptions';

// interface IButton {
//   fontWeight: number;
// }

interface ISize {
  height: string;
  fontSize: string;
}

interface ITypography {
  fontWeight: number;
  fontSize: string;
  lineHeight: number;
  letterSpacing: string | number;
}

interface IOptions {
  palette: Record<string, string>;
  borderRadius: string;
  typography: Record<string, ITypography>;
  // button: {
  //   small: IButton;
  //   medium: IButton;
  //   large: IButton;
  // };
  sizes: {
    small: ISize;
    medium: ISize;
    large: ISize;
  };
}

const PREFIX_NAME = 'pv';

/**
 * Transform color to RGB object
 * @example
 *  colorToRgb('#fff') // => { r: 255, g: 255, b: 255 }
 *  colorToRgb('0, 0, 0') // => { r: 0, g: 0, b: 0 }
 */
const colorToRgb = (color: string) => {
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
};

/**
 * Transform camelCase to kebab-case
 * @example
 *  camelCaseToKebalCase('fontSize') // => 'font-size'
 *  camelCaseToKebalCase('height') // => 'height'
 */
const camelCaseToKebalCase = (value: string) => (
  value
    .replace(
      /[A-Z]/g,
      (letter: string) => `-${letter.toLowerCase()}`,
    )
);

export default function create(outputPath: string, options: IOptions = defaultOptions): void {
  let styles = '';
  let fillClasses = '';
  let strokeClasses = '';
  let colorClasses = '';
  let typographyClasses = '';
  let sizeClasses = '';
  let cssVariables = '';

  /**
   * Palette & classes for fill, stroke and color
   */
  Object.keys(options.palette).forEach((keyName) => {
    const colorName = keyName.toLowerCase();
    const variableName = `--${PREFIX_NAME}-color-${colorName}-rgb`;
    const colorRgb = colorToRgb(options.palette[keyName]);
    const variableValue = `${colorRgb.r}, ${colorRgb.g}, ${colorRgb.b}`;
    const styleValue = `rgb(var(${variableName}))`;

    cssVariables += `\n\t${variableName}: ${variableValue};`;
    fillClasses += `\n.fill_${colorName} {\n\tbackground-color: ${styleValue};\n}`;
    strokeClasses += `\n.stroke_${colorName} {\n\tborder-color: ${styleValue};\n}`;
    colorClasses += `\n.color_${colorName} {\n\tcolor: ${styleValue};\n}`;
  });

  /**
   * Size classes
   */
  Object.keys(options.sizes).forEach((keyNameType: keyof IOptions['sizes']) => {
    const typeValue = options.sizes[keyNameType];
    let typeStyles = '';

    Object.keys(typeValue).forEach((keyNameProperty: keyof ISize) => {
      const variableValue = typeValue[keyNameProperty];

      typeStyles += `\n\t${camelCaseToKebalCase(keyNameProperty)}: ${variableValue};`;
    });

    sizeClasses += `\n.size_${keyNameType} {${typeStyles}\n}`;
  });

  /**
   * Size variables
   */
  cssVariables += `\n\t--${PREFIX_NAME}-size-small: ${options.sizes.small.height};`;
  cssVariables += `\n\t--${PREFIX_NAME}-size-medium: ${options.sizes.medium.height};`;
  cssVariables += `\n\t--${PREFIX_NAME}-size-large: ${options.sizes.large.height};`;

  /**
   * Typography classes
   */
  Object.keys(options.typography).forEach((keyNameType: keyof IOptions['typography']) => {
    const typeValue = options.typography[keyNameType];
    let typeStyles = '';

    Object.keys(typeValue).forEach((keyNameProperty: keyof ITypography) => {
      const variableValue = typeValue[keyNameProperty];

      typeStyles += `\n\t${camelCaseToKebalCase(keyNameProperty)}: ${variableValue};`;
    });

    typographyClasses += `\n${keyNameType},\n.${keyNameType} {${typeStyles}\n}`;
  });

  /**
   * Border-radius variable
   */
  cssVariables += `\n\t--${PREFIX_NAME}-border-radius: ${options.borderRadius};`;

  /**
   * Combine styles to single css string
   */
  styles += `:root {${cssVariables}\n}\n${fillClasses}\n${strokeClasses}\n${colorClasses}\n${typographyClasses}\n${sizeClasses}`;

  const outputPathParsed = path.parse(outputPath);

  if (!fs.existsSync(outputPathParsed.dir)) {
    fs.mkdirSync(outputPathParsed.dir);
  }

  fs.writeFileSync(
    outputPath,
    styles,
  );

  process.exit(0);
}
