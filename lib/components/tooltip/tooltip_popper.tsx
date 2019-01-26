import * as React from 'react';
import classnames from 'classnames';
import { Popper } from 'react-popper';
import RightTriangleIcon from '../../icons/right_triangle';
import { Omit } from '../../typings';

export type PlacementType = 'auto-start'
  | 'auto'
  | 'auto-end'
  | 'top-start'
  | 'top'
  | 'top-end'
  | 'right-start'
  | 'right'
  | 'right-end'
  | 'bottom-end'
  | 'bottom'
  | 'bottom-start'
  | 'left-end'
  | 'left'
  | 'left-start';

export interface ITooltipPopperProps {
  /**
   * This is what will be displayed inside the popper.
   */
  children: React.ReactNode;
  /**
   * The `referenceObject` is an object that provides an interface
   * compatible with Popper.js and lets you use it as replacement of
   * a real DOM node.
   */
  referenceElement: React.ReactElement<HTMLElement>;
  /**
   * If `true`, the popper arrow is shown.
   */
  arrow?: boolean;
  /**
   * If `true`, the popper is shown.
   */
  open?: boolean;
  /**
   * Popper placement.
   */
  placement?: PlacementType;
  /**
   * Set this to `true` if you want popper to position it self in `fixed` mode.
   */
  positionFixed?: boolean;
  /**
   * Padding from popper to `referenceElement` in `px`.
   */
  offset?: number;
  /**
   * Color for tooltip component
   */
  color?: string;
}

export class TooltipPopper extends React.Component<ITooltipPopperProps> {
  public static defaultProps: Omit<ITooltipPopperProps, 'children' | 'referenceElement'> = {
    arrow: true,
    placement: 'auto',
    positionFixed: true,
    offset: 10,
    color: 'white',
  };

  private renderContent(obj: any): JSX.Element {
    const {
      children,
      arrow,
      offset,
      color,
    } = this.props;

    const {
      ref,
      style: { top, left, position },
      placement,
      arrowProps,
    } = obj;

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
  }

  render(): JSX.Element {
    const {
      children,
      arrow,
      referenceElement,
      open,
      placement,
      positionFixed,
      offset,
      color,
      ...other
    } = this.props;

    if (!open) {
      return null;
    }

    return (
      <Popper
        // tslint:disable-next-line
        modifiers={{
          computeStyle: {
            gpuAcceleration: false,
          },
        }}
        placement={placement}
        referenceElement={referenceElement as any}
        positionFixed={positionFixed}
        {...other}
      >
        {this.renderContent.bind(this)}
      </Popper>
    );
  }
}
