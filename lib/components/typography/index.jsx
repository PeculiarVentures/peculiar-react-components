import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export const textTypePropType = PropTypes.oneOfType([
  PropTypes.oneOf([
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    'b1',
    'b2',
    'b3',
    'c1',
    '',
  ]),
  PropTypes.string,
]);

/**
 * Typography component
 */
export default function Typography(props, context) {
  const {
    children,
    type: propsType,
    color,
    align,
    tabletType,
    mobileType,
    className,
    ...other
  } = props;
  const { device } = context;
  let type = propsType || 'c1';

  if (device) {
    if (mobileType && device.type === 'mobile') {
      type = mobileType;
    }

    if (tabletType && device.type === 'tablet') {
      type = tabletType;
    }
  }

  const basicClassNames = classNames(
    'break_word',
    [`text_${color}`],
    { [`text_${align}`]: align !== 'auto' },
    className,
  );
  const Component = /h[1-6]/.test(type) ? type : 'p';

  return (
    <Component
      {...other}
      data-component="typography"
      data-classnamemobile={mobileType ? classNames(basicClassNames, mobileType) : null}
      data-classnametablet={tabletType ? classNames(basicClassNames, tabletType) : null}
      data-classnamedesktop={(mobileType || tabletType) ? basicClassNames : null}
      className={classNames(
        basicClassNames,
        type,
      )}
    >
      {children}
    </Component>
  );
}

Typography.propTypes = {
  /**
   * This is what will be displayed inside the button
   */
  children: PropTypes.node.isRequired,
  /**
   * Typography type
   */
  type: textTypePropType,
  /**
   * Typography type for tablet
   */
  tabletType: textTypePropType,
  /**
   * Typography type for mobile
   */
  mobileType: textTypePropType,
  /**
   * Component color from theme
   */
  color: PropTypes.string,
  /**
   * Component content aligment
   */
  align: PropTypes.oneOf(['left', 'center', 'right', 'auto']),
  /**
   * The CSS class name of the root element
   */
  className: PropTypes.string,
};

Typography.contextTypes = {
  device: PropTypes.object,
};

Typography.defaultProps = {
  type: 'b1',
  color: 'black',
  align: 'left',
  className: '',
  tabletType: '',
  mobileType: '',
};
