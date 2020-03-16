import * as React from 'react';
import classnames from 'clsx';
import { EColor, EAlign } from '../../common/props';

export interface ITypographyProps {
  /**
   * This is what will be displayed inside the component.
   */
  children: React.ReactText;
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
  /**
   * If `true`, the text will not wrap, but instead will truncate with a text overflow ellipsis.
   */
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
      children,
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
      title: ellipsis ? children.toString() : undefined,
      children,
      className: newClassName,
      ...other,
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