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
  referenceElement: Element;
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

interface ITooltipContentProps {
  ref: React.RefObject<HTMLDivElement>;
  style: React.CSSProperties;
  placement: PlacementType;
  arrowProps: React.HTMLAttributes<any> & React.RefAttributes<any>;
}

export class TooltipPopper extends React.Component<ITooltipPopperProps> {
  public static defaultProps: Omit<ITooltipPopperProps, 'children' | 'referenceElement'> = {
    arrow: true,
    placement: 'auto',
    positionFixed: true,
    offset: 10,
    color: 'white',
  };

  private renderContent(props: ITooltipContentProps): JSX.Element {
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
    } = props;

    let direction: string = '';

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
        data-component="tooltip_popper"
        ref={ref}
        // tslint:disable-next-line
        style={{
          position,
          top: 0,
          left: 0,
          transform: `translate3d(${left}px, ${top}px, 0)`,
          transformOrigin: 'top center',
          [`padding${direction}`]: offset,
        }}
      >
        <div
          data-component="tooltip_content"
          data-placement={placement}
          // tslint:disable-next-line
          className={classnames(
            'tooltip',
            'shadow',
            'round_small',
            `fill_${color}`,
          )}
        >
          {arrow && ( // tslint:disable-line
            <div
              data-component="tooltip_arrow"
              className="tooltip_arrow"
              ref={arrowProps.ref}
              style={arrowProps.style}
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
