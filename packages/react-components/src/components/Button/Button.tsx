import * as React from 'react';
import AbstractButton from './AbstractButton';

export default class Button extends AbstractButton<React.ButtonHTMLAttributes<HTMLButtonElement>> {
  static displayName = 'Button';

  render() {
    const props = this.getProps();

    return (
      <button
        type="button"
        {...props}
      >
        {this.renderChildren()}
      </button>
    );
  }
}
