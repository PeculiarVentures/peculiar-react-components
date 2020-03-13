interface IStyle {
  name: string;
  prefix?: string;
  useValueNameAsTag?: boolean;
  values: Record<string, Record<string, string | number | any>>;
}

interface IVariables {
  colors: Record<string, { name: string; value: string; }>;
  other: Record<string, { name: string; value: string | number; }>;
}

export default class Styles {
  private prefix: string;

  private styles: IStyle[] = [];

  private variables: IVariables = {
    colors: {},
    other: {},
  };

  constructor(prefix: string = 'pv') {
    this.prefix = prefix;
  }

  /**
   * Transform color to RGB object
   * @example
   *  colorToRgb('#fff') // => { r: 255, g: 255, b: 255 }
   *  colorToRgb('0, 0, 0') // => { r: 0, g: 0, b: 0 }
   */
  static colorToRgb(color: string) {
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

  /**
   * Transform camelCase to kebab-case
   * @example
   *  camelCaseToKebalCase('fontSize') // => 'font-size'
   *  camelCaseToKebalCase('height') // => 'height'
   */
  static camelCaseToKebalCase(value: string) {
    return value
      .replace(
        /[A-Z]/g,
        (letter: string) => `-${letter.toLowerCase()}`,
      );
  }

  static changeValuesKeyNameCamelCaseToKebalCase(values: IStyle['values']) {
    const newValues = { ...values };

    Object.keys(newValues).forEach((keyNameClass) => {
      const styles = { ...newValues[keyNameClass] };

      Object.keys(styles).forEach((keyNameStyle) => {
        const newKeyStyleName = Styles.camelCaseToKebalCase(keyNameStyle);

        styles[newKeyStyleName] = styles[keyNameStyle];

        if (newKeyStyleName !== keyNameStyle) {
          delete styles[keyNameStyle];
        }
      });

      newValues[keyNameClass] = styles;
    });

    return newValues;
  }

  getStyle(name: string) {
    return this.styles
      .find((style) => style.name === name);
  }

  addStyle(
    name: string,
    values: IStyle['values'],
    options: { prefix?: string; useValueNameAsTag?: boolean; } = {},
  ) {
    const style = this.getStyle(name);

    if (style) {
      Object.assign(
        style.values,
        Styles.changeValuesKeyNameCamelCaseToKebalCase(values),
      );

      return this;
    }

    this.styles.push({
      ...options,
      name,
      values: Styles.changeValuesKeyNameCamelCaseToKebalCase(values),
    });

    return this;
  }

  addStyleFromColorVariables(name: string, styleName: string) {
    const styles: Record<string, Record<string, string | number>> = {};

    Object.keys(this.variables.colors).forEach((keyName) => {
      const variableName = this.variables.colors[keyName].name;

      styles[keyName] = {
        [styleName]: `rgb(var(${variableName}))`,
      };
    });

    this.addStyle(name, styles, { prefix: name });

    return this;
  }

  addColorVariables(values: Record<string, string>) {
    Object.keys(values).forEach((keyName) => {
      this.addColorVariable(keyName, values[keyName]);
    });

    return this;
  }

  addColorVariable(name: string, value: string) {
    const { r, g, b } = Styles.colorToRgb(value);

    this.variables.colors[name] = {
      name: `--${this.prefix}-color-${name}-rgb`,
      value: `${r}, ${g}, ${b}`,
    };

    return this;
  }

  addVariable(name: string, value: string | number) {
    this.variables.other[name] = {
      name: `--${this.prefix}-${name}`,
      value,
    };

    return this;
  }

  toStringVariables(): string {
    let outputString = '';

    Object.keys(this.variables.colors).forEach((keyName) => {
      const variable = this.variables.colors[keyName];

      outputString += `\t${variable.name}: ${variable.value};\n`;
    });

    Object.keys(this.variables.other).forEach((keyName) => {
      const variable = this.variables.other[keyName];

      outputString += `\t${variable.name}: ${variable.value};\n`;
    });

    return `:root {\n${outputString}}`;
  }

  toStringStyles(): string {
    let outputString = '';

    this.styles.forEach((style) => {
      Object.keys(style.values).forEach((keyName) => {
        const value = style.values[keyName];
        const prefix = style.prefix ? `${style.prefix}_` : '';
        const tag = style.useValueNameAsTag ? `${keyName},` : '';
        let styles = '';

        Object.keys(value).forEach((keyNameStyle) => {
          styles += `\n\t${keyNameStyle}: ${value[keyNameStyle]};`;
        });

        outputString += `${tag}.${prefix}${keyName} {${styles}\n}\n`;
      });
    });

    return outputString;
  }
}
