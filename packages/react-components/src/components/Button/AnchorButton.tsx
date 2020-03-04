import * as React from 'react';
import AbstractButton from './AbstractButton';

export default class AnchorButton extends AbstractButton<
React.AnchorHTMLAttributes<HTMLAnchorElement>
> {
  static displayName = 'AnchorButton';

  render() {
    const props = this.getProps();

    return (
      <a
        role="button"
        {...props}
        href={props.disabled ? undefined : props.href}
      >
        {this.renderChildren()}
      </a>
    );
  }
}
