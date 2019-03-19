import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Popper } from 'react-popper';
import RightTriangleIcon from '../icons/right_triangle';

/**
 * TooltipPopper component
 * @description
 *  All props for Popper you can found on https://github.com/FezVrasta/react-popper.
 */
export default function TooltipPopper(props) {
  const {
    children,
    arrow,
    referenceElement,
    open,
    placement: placementProp,
    positionFixed,
    offset,
    color,
    ...other
  } = props;

  if (!open) {
    return null;
  }

  return (
    <Popper
      modifiers={{
        computeStyle: {
          gpuAcceleration: false,
        },
      }}
      placement={placementProp}
      referenceElement={referenceElement}
      positionFixed={positionFixed}
      {...other}
    >
      {({
        ref,
        style: { top, left, position },
        placement,
        arrowProps,
      }) => {
        let direction = '';

        if (placement) {
          if (placement.indexOf('right') !== -1) {
            direction = 'Left';
          } else if (placement.indexOf('left') !== -1) {
            direction = 'Right';
          } else if (placement.indexOf('bottom') !== -1) {
            direction = 'Top';
          } else if (placement.indexOf('top') !== -1) {
            direction = 'Bottom';
          }
        }

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
            }}
            data-component="tooltip_popper"
          >
            <div
              className={classnames(
                'tooltip',
                `fill_${color}`,
                'shadow',
                'round_small',
              )}
              data-component="tooltip_content"
              data-placement={placement}
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
      }}
    </Popper>
  );
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
   * Color for tooltip component
   */
  color: PropTypes.string,
};

TooltipPopper.defaultProps = {
  arrow: true,
  open: false,
  placement: 'auto',
  positionFixed: true,
  offset: 10,
  color: 'white',
};