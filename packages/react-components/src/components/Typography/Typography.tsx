import * as React from 'react';
import classnames from 'clsx';
import { EColor, EAlign } from '../../common/props';

export interface ITypographyProps {
  /**
   * This is what will be displayed inside the component.
   */
  children: React.ReactNode;
  /**
   * Typography type.
   */
  type?: string;
  /**
   * Component color from theme.
   */
  color?: string;
  /**
   * The CSS class name of the root element.
   */
  className?: string;
  /**
   * Text align.
   */
  align?: keyof typeof EAlign;
  ellipsis?: boolean;
}

export default class Typography extends React.PureComponent<
ITypographyProps & React.HTMLAttributes<HTMLElement>
> {
  static displayName = 'Typography';

  static defaultProps: Omit<ITypographyProps, 'children'> = {
    type: 'c1',
    color: EColor.black,
  };

  private getProps(): React.HTMLAttributes<HTMLElement> {
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
