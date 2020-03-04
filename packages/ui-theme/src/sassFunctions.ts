import sass from 'sass';

interface IButton {
  height: string;
  fontSize: string;
  fontWeight: number;
}

interface ITypography {
  weight: number;
  size: string;
  height: number;
  spacing: string | number;
}

interface IOptions {
  palette: Record<string, string>;
  typography: Record<string, ITypography>;
  button: {
    small: IButton;
    medium: IButton;
    large: IButton;
  };
}

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
      return null;
    }

    return {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16),
    };
  }

  const result = color.split(',');

  return {
    r: parseInt(result[0], 10),
    g: parseInt(result[1], 10),
    b: parseInt(result[2], 10),
  };
};

export default function sassFunctions(options: IOptions) {
  return {
    'palette()': () => {
      const keys = Object.keys(options.palette);
      const map = new sass.types.Map(keys.length);

      keys.forEach((name: keyof typeof options.palette, index) => {
        const value = options.palette[name];
        const rgb = colorToRgb(value);

        map.setKey(index, new sass.types.String(name));
        map.setValue(index, new sass.types.Color(rgb.r, rgb.g, rgb.b));
      });

      return map;
    },
    'variable($path)': (path: sass.types.String) => {
      const value = path.getValue();
      const valueVariable = eval(`options.${value}`);

      if (typeof valueVariable === 'string') {
        return new sass.types.String(valueVariable);
      }

      if (typeof valueVariable === 'number') {
        return new sass.types.Number(valueVariable);
      }

      if (typeof valueVariable === 'object') {
        const keys = Object.keys(valueVariable);
        const list = new sass.types.List(keys.length);

        keys.forEach((name, index) => {
          list.setValue(index, new sass.types.String(name));
        });

        return list;
      }

      throw new Error(`Can't get variable ${path}`);
    },
  };
}
