import * as React from 'react';
import classnames from 'classnames';

export interface ITypographyProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  type?: string;
  color?: string;
  className?: string;
  align?: 'left' | 'center' | 'right';
  ellipsis?: boolean;
}

export default class Typography extends React.PureComponent<ITypographyProps> {
  static displayName = 'Typography';

  static defaultProps: Omit<ITypographyProps, 'children'> = {
    type: 'c1',
    color: 'black',
  };

  private getProps() {
    const {
      type,
      color,
      align,
      className,
      ellipsis,
      ...other
    } = this.props;

    const newClassName = classnames(
      type,
      [`color_${color}`],
      {
        ellipsis,
        [`align_${align}`]: align,
      },
      className,
    );

    return {
      ...other,
      className: newClassName,
    };
  }

  render() {
    const { type } = this.props;
    const tagType = /h[1-6]/.test(type) ? type : 'p';

    return React.createElement(
      tagType,
      this.getProps(),
    );
  }
}
