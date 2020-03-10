import * as React from 'react';

export enum EStrokeStyle {
  solid = 'solid',
  dashed = 'dashed',
  dotted = 'dotted',
  none= 'none',
}
export enum EStrokeType {
  horizontal = 'horizontal',
  vertical = 'vertical',
  top = 'top',
  right = 'right',
  bottom = 'bottom',
  left = 'left',
}

export interface IBoxProps {
  children?: React.ReactNode;
  tagType?: keyof React.ReactHTML;
  fill?: string;
  fillOpacity?: number;
  stroke?: string;
  strokeWidth?: number;
  strokeOpacity?: number;
  strokeStyle?: keyof typeof EStrokeStyle;
  strokeType?: keyof typeof EStrokeType;
  className?: string;
}

export default class Box extends React.PureComponent<
IBoxProps & React.HTMLAttributes<HTMLElement>
> {
  static getOpacity(value: number): number {
    if (typeof value === 'number') {
      if (value > 1) {
        return 1;
      }

      if (value < 0) {
        return 0;
      }

      return value;
    }

    return 1;
  }

  static getBorderWidth(type: IBoxProps['strokeType'], width: number): number | string {
    if (!type) {
      return width;
    }

    let top = 0;
    let right = 0;
    let bottom = 0;
    let left = 0;

    if (type === EStrokeType.horizontal || type === EStrokeType.top) {
      top = width;
    }

    if (type === EStrokeType.horizontal || type === EStrokeType.bottom) {
      bottom = width;
    }

    if (type === EStrokeType.vertical || type === EStrokeType.left) {
      left = width;
    }

    if (type === EStrokeType.vertical || type === EStrokeType.right) {
      right = width;
    }

    return [top, right, bottom, left, ''].join('px ');
  }

  static defaultProps: IBoxProps = {
    tagType: 'div',
    strokeStyle: EStrokeStyle.solid,
    strokeWidth: 1,
  };

  private getProps(): React.HTMLAttributes<HTMLElement> {
    const {
      tagType,
      fill,
      fillOpacity,
      stroke,
      strokeWidth,
      strokeOpacity,
      strokeStyle,
      strokeType,
      style,
      ...other
    } = this.props;

    const newStyle = {
      ...style,
      backgroundColor: fill
        ? `rgba(var(--pv-color-${fill}-rgb), ${Box.getOpacity(fillOpacity)})`
        : undefined,
      borderColor: stroke
        ? `rgba(var(--pv-color-${stroke}-rgb), ${Box.getOpacity(strokeOpacity)})`
        : undefined,
      borderWidth: stroke
        ? Box.getBorderWidth(strokeType, strokeWidth)
        : undefined,
      borderStyle: stroke
        ? strokeStyle
        : undefined,
    };

    return {
      ...other,
      style: newStyle,
    };
  }

  render() {
    const { tagType } = this.props;

    return React.createElement(
      tagType,
      this.getProps(),
    );
  }
}
