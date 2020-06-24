import React from 'react';
import { HighlightCode } from 'lib-react-components';

/* eslint quotes: 1 */
export default function Usage() {
  return (
    <HighlightCode lang="jsx">
      {'<h1>Hello world!</h1>'}
    </HighlightCode>
  );
}
