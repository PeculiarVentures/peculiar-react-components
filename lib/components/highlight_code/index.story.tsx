import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { select, text } from '@storybook/addon-knobs';
import { HighlightCode } from './index';

const lang = {
  css: 'css',
  html: 'html',
  javascript: 'javascript',
  js: 'js',
  jsx: 'jsx',
  markup: 'markup',
  svg: 'svg',
  xml: 'xml',
  bash: 'bash',
  glsl: 'glsl',
  none: 'none',
};

const props: any = {
  regular: () => ({
    lang: select('Language (lang)', lang, 'css'),
    children: text('Children (children)', `
html, body {
  font-family: Arial, sans-serif;
  height: 100%;
}

#root {
  padding: 20px;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}`,
    ),
  }),
};

storiesOf('HighlightCode', module)
  .add('default', () => {
    const regularProps = props.regular();

    return (
      <HighlightCode {...regularProps} />
    );
  });
