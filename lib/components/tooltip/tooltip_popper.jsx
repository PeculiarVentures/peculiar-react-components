import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Popper } from 'react-popper';
import RightTriangleIcon from '../icons/right_triangle';
import Portal from '../../containers/portal';

/**
 * TooltipPopper component
 * @description
 *  All props for Popper you can found on https://github.com/FezVrasta/react-popper.
 */
export default class TooltipPopper extends React.Component {
  static getDirection(placement) {
    if (placement) {
      if (placement.indexOf('right') === 0) {
        return 'Left';
      }
      if (placement.indexOf('left') === 0) {
        return 'Right';
      }
      if (placement.indexOf('bottom') === 0) {
        return 'Top';
      }
      if (placement.indexOf('top') === 0) {
        return 'Bottom';
      }
    }

    return '';
  }

  componentWillReceiveProps() {
    // Make schedule to update tooltip, position if button position failed
    this.scheduleUpdate();
  }

  scheduleUpdate = () => null;

  renderTooltipBody = ({
    ref,
    style: { top, left, position },
    placement,
    arrowProps,
    scheduleUpdate,
  }) => {
    const {
      children,
      arrow,
      offset,
      color,
      zIndex,
      classNameTooltip,
      classNameTooltipContent,
      showDelay,
    } = this.props;
    const direction = TooltipPopper.getDirection(placement);

    this.scheduleUpdate = scheduleUpdate;

    return (
      <div
        ref={ref}
        style={{
          top: 0,
          left: 0,
          position,
          transform: `translate3d(${left}px, ${top}px, 0)`,
          transformOrigin: 'top center',
          [`padding${direction}`]: offset,
          zIndex,
        }}
        data-component="tooltip_popper"
        className={classNameTooltip}
      >
        <div
          className={classnames(
            'tooltip',
            `fill_${color}`,
            'shadow',
            'round_small',
            'break_word',
            classNameTooltipContent,
          )}
          data-component="tooltip_content"
          data-placement={placement}
          style={{
            animationDelay: `${showDelay}ms`,
            MozAnimationDelay: `${showDelay}ms`,
            WebkitAnimationDelay: `${showDelay}ms`,
          }}
        >
          {arrow && (
            <div
              ref={arrowProps.ref}
              style={arrowProps.style}
              data-component="tooltip_arrow"
              className="tooltip_arrow"
            >
              <RightTriangleIcon
                className={classnames('tooltip_arrow_icon', `fill_${color}`)}
              />
            </div>
          )}
          {children}
        </div>
      </div>
    );
  }

  render() {
    const {
      referenceElement,
      open,
      placement: placementProp,
      positionFixed,
      usePortal,
      preventOverflow,
      preventFlip,
      flipBoundaryElement,
      ...other
    } = this.props;

    if (!open) {
      return null;
    }

    const renderTooltip = (
      <Popper
        modifiers={{
          computeStyle: {
            gpuAcceleration: false,
          },
          preventOverflow: {
            enabled: preventOverflow,
          },
          hide: {
            enabled: preventOverflow,
          },
          flip: {
            enabled: !preventFlip,
            boundariesElement: flipBoundaryElement,
          },
        }}
        placement={placementProp}
        referenceElement={referenceElement}
        positionFixed={positionFixed}
        {...other}
      >
        {this.renderTooltipBody}
      </Popper>
    );

    if (usePortal) {
      return (
        <Portal container={usePortal instanceof Element ? usePortal : null}>
          {renderTooltip}
        </Portal>
      );
    }

    return renderTooltip;
  }
}

TooltipPopper.propTypes = {
  /**
   * This is what will be displayed inside the popper.
   */
  children: PropTypes.node.isRequired,
  /**
   * If `true`, the popper arrow is shown.
   */
  arrow: PropTypes.bool,
  /**
   * The `referenceObject` is an object that provides an interface
   * compatible with Popper.js and lets you use it as replacement of
   * a real DOM node.
   */
  referenceElement: PropTypes.shape({
    clientHeight: PropTypes.number,
    clientWidth: PropTypes.number,
    getBoundingClientRect: PropTypes.func,
  }).isRequired,
  /**
   * If `true`, the popper is shown.
   */
  open: PropTypes.bool,
  /**
   * Popper placement.
   */
  placement: PropTypes.oneOf([
    'auto-start',
    'auto',
    'auto-end',
    'top-start',
    'top',
    'top-end',
    'right-start',
    'right',
    'right-end',
    'bottom-end',
    'bottom',
    'bottom-start',
    'left-end',
    'left',
    'left-start',
  ]),
  /**
   * Set this to `true` if you want popper to position it self in `fixed` mode.
   */
  positionFixed: PropTypes.bool,
  /**
   * Padding from popper to `referenceElement` in `px`.
   */
  offset: PropTypes.number,
  /**
   * Color for tooltip component.
   */
  color: PropTypes.string,
  /**
   * Z-index for tooltip component.
   */
  zIndex: PropTypes.number,
  /**
   * Use React portal for render tooltip to another elemenet.
   */
  usePortal: PropTypes.oneOfType([PropTypes.bool, PropTypes.instanceOf(HTMLElement)]),
  /**
   * Use preventOverflow for prevent overflow on tooltip.
   */
  preventOverflow: PropTypes.bool,
  /**
   * Use preventFlip for prevent flipping tooltip, when no space.
   */
  preventFlip: PropTypes.bool,
  /**
   * Class name for tooltip popper root element
   */
  classNameTooltip: PropTypes.string,
  /**
   * Class name for tooltip popper content element
   */
  classNameTooltipContent: PropTypes.string,
  /**
   * The number of milliseconds to wait before showing the tooltip.
   */
  showDelay: PropTypes.number,
  /**
   * Flip boundary element modifier
   */
  flipBoundaryElement: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(HTMLElement)]),
};

TooltipPopper.defaultProps = {
  arrow: true,
  open: false,
  placement: 'auto',
  positionFixed: true,
  offset: 10,
  color: 'white',
  zIndex: 1,
  usePortal: false,
  preventOverflow: true,
  preventFlip: false,
  classNameTooltip: '',
  classNameTooltipContent: '',
  showDelay: 0,
  flipBoundaryElement: 'viewport',
};
