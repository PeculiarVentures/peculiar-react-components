import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Omit } from '../../typings';

type TextType = 'h1' |
  'h2' |
  'h3' |
  'h4' |
  'h5' |
  'h6' |
  'b1' |
  'b2' |
  'b3' |
  'c1' |
  string;

export interface ITypographyProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * This is what will be displayed inside the component
   */
  children: React.ReactNode;
  /**
   * Typography type
   */
  type?: TextType;
  /**
   * Typography type for tablet
   */
  tabletType?: TextType;
  /**
   * Typography type for mobile
   */
  mobileType?: TextType;
  /**
   * Component color from theme
   */
  color?: string;
  /**
   * Component content aligment
   */
  align?: 'left' | 'center' | 'right' | 'auto';
  /**
   * The CSS class name of the root element
   */
  className?: string;
}

export class Typography extends React.Component<ITypographyProps> {
  public static defaultProps: Omit<ITypographyProps, 'children'> = {
    type: 'b1',
    color: 'black',
    align: 'left',
  };

  public static contextTypes = {
    device: PropTypes.object,
  };

  render(): JSX.Element {
    const {
      children,
      type: propsType,
      color,
      align,
      tabletType,
      mobileType,
      className,
      ...other
    } = this.props;
    const { device } = this.context;
    let type = propsType || 'c1';

    if (device) {
      if (mobileType && device.type === 'mobile') {
        type = mobileType;
      }

      if (tabletType && device.type === 'tablet') {
        type = tabletType;
      }
    }

    const basicClassNames = classnames(
      [`text_${color}`],
      {
        [`text_${align}`]: align !== 'auto',
      },
      className,
    );
    const component = /h[1-6]/.test(type) ? type : 'p';

    return React.createElement(
      component,
      {
        ...other,
        'data-component': 'typography',
        'data-classnamemobile': mobileType ? classnames(basicClassNames, mobileType) : null,
        'data-classnametablet': tabletType ? classnames(basicClassNames, tabletType) : null,
        'data-classnamedesktop': (mobileType || tabletType) ? basicClassNames : null,
        className: classnames(basicClassNames, type),
      },
      children,
    );
  }
}
