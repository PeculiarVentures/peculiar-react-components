const path = require('path');
const themeConstructor = require('lib-theme-contructor');

const fonts = {
  h1: {
    weight: 700,
    size: '30px',
    height: 1.36,
    spacing: '-0.1px',
  },
  h2: {
    weight: 700,
    size: '25px',
    height: 1.4,
    spacing: 0,
  },
  h3: {
    weight: 700,
    size: '22px',
    height: 1.4,
    spacing: '0.1px',
  },
  h4: {
    weight: 700,
    size: '16px',
    height: 1.6,
    spacing: '0.15px',
  },
  h5: {
    weight: 600,
    size: '15px',
    height: 1.7,
    spacing: '0.25px',
  },
  h6: {
    weight: 600,
    size: '15px',
    height: 1.3,
    spacing: '0.4px',
  },
  b1: {
    weight: 400,
    size: '16px',
    height: 1.8,
    spacing: '0.1px',
  },
  b2: {
    weight: 400,
    size: '15px',
    height: 1.6,
    spacing: '0.35px',
  },
  b3: {
    weight: 400,
    size: '13px',
    height: 1.6,
    spacing: '0.4px',
  },
  c1: {
    weight: 400,
    size: '12px',
    height: 1.4,
    spacing: '0.5px',
  },
};

(async () => {
  try {
    await themeConstructor.createThemes([
      {
        name: 'default',
        entry: path.join(__dirname, '../lib/index.sss'),
        out: path.join(__dirname, '../lib/themes'),
        options: {
          palette: {
            primary: '#4DA3FC',
            secondary: '#9013FE',
            black: '#222D47',
            dark_grey: '#4A4A4A',
            grey: '#DFDFDF',
            light_grey: '#F2F2F2',
            success: '#0ABE55',
            wrong: '#D0021B',
            white: '#FFFFFF',
          },
          variables: {
            borderRadius: '3px',
            button: {
              small: {
                height: '24px',
                fontSize: '12px',
                fontWeight: 600,
              },
              medium: {
                height: '30px',
                fontSize: '13px',
                fontWeight: 600,
              },
              large: {
                height: '40px',
                fontSize: '13px',
                fontWeight: 600,
              },
            },
            input: {
              medium: {
                fontSize: '12px',
                height: '30px',
              },
              large: {
                fontSize: '13px',
                height: '40px',
              },
            },
            checkbox: {
              size: '20px',
              iconSize: '10px',
            },
            switch: {
              width: '36px',
              height: '22px',
            },
            // textareaMediumHeight: '150px',
            // textareaLargeHeight: '200px',

            // highlightCodeFontSize: '14px',
            // highlightCodeColor: '#222D47',
            // highlightCodeBorderColor: '#f2f2f2',
            // highlightCodeBackgroundColor: 'rgba(246, 246, 246, .2)',
            // highlightCodeColorComment: 'slategray',
            // highlightCodeColorKeyword: '#07a',
            // highlightCodeColorPunctuation: '#999',
            // highlightCodeColorProperty: '#905',
            // highlightCodeColorSelector: '#690',
            // highlightCodeColorOperator: '#9a6e3a',
            // highlightCodeColorFunction: '#DD4A68',
            // highlightCodeColorVariable: '#e90',
            fonts,
          },
        },
      },
    ]);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
