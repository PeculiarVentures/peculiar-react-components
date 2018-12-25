export type Colors = {
  black: string,
  grey: string,
  wrong: string,
  primary: string,
  white: string,
  success: string;
  grey_2_border: string;
};

const palette: Colors = {
  black: '#333333',
  grey: '#A3AAAE',
  wrong: '#EE0000',
  primary: '#1B458F',
  white: '#ffffff',
  success: '#219653',
  grey_2_border: '#EAEDF2',
};

const fonts = {
  h1: {
    weight: 700,
    size: '32px',
    height: 1.37,
    spacing: '0.2px',
  },
  h2: {
    weight: 700,
    size: '22px',
    height: 1.45,
    spacing: 0,
  },
  h3: {
    weight: 700,
    size: '20px',
    height: 1.35,
    spacing: '0.22px',
  },
  h4: {
    weight: 700,
    size: '18px',
    height: 1.38,
    spacing: 0,
  },
  h5: {
    weight: 700,
    size: '16px',
    height: 1.43,
    spacing: 0,
  },
  h6: {
    weight: 600,
    size: '15px',
    height: 1.35,
    spacing: 0,
  },
  b1: {
    weight: 400,
    size: '14px',
    height: 1.4,
    spacing: 0,
  },
  b2: {
    weight: 400,
    size: '13px',
    height: 1.46,
    spacing: 0,
  },
  b3: {
    weight: 400,
    size: '12px',
    height: 1.5,
    spacing: 0,
  },
  c1: {
    weight: 400,
    size: '11px',
    height: 1.36,
    spacing: '0.41px',
  },
};

export default {
  palette,
  variables: {
    fonts,
    borderRadius: '2px',
    button: {
      small: {
        height: '32px',
        fontSize: '13px',
        fontWeight: 400,
      },
      medium: {
        height: '36px',
        fontSize: '13px',
        fontWeight: 400,
      },
      large: {
        height: '45px',
        fontSize: '13px',
        fontWeight: 400,
      },
    },
    input: {
      medium: {
        fontSize: '12px',
        height: '36px',
      },
      large: {
        fontSize: '12px',
        height: '45px',
      },
    },

    textareaMediumHeight: '150px',
    textareaLargeHeight: '210px',

    highlightCodeFontSize: '16px',
    highlightCodeColor: '#ccc',
    highlightCodeBorderColor: '#0D091A',
    highlightCodeBackgroundColor: '#0D091A',
    highlightCodeColorComment: '#373D4D',
    highlightCodeColorKeyword: '#c359c5',
    highlightCodeColorPunctuation: '#ccc',
    highlightCodeColorProperty: '#e2777a',
    highlightCodeColorSelector: '#00D093',
    highlightCodeColorOperator: '#67cdcc',
    highlightCodeColorFunction: '#ff8b8e',
    highlightCodeColorVariable: '#e90',
  },
};
