import sass from 'sass';

interface IOptions {
  palette: Record<string, string>;
}

export default function sassFunctions(options: IOptions) {
  return {
    'palette()': () => {
      const keys = Object.keys(options.palette);
      const paletteMap = new sass.types.Map(keys.length);

      keys.forEach((name: keyof typeof options.palette, index) => {
        const value = options.palette[name];

        paletteMap.setKey(index, new sass.types.String(name));
        paletteMap.setValue(index, new sass.types.String(value));
      });

      return paletteMap;
    },
  };
}
