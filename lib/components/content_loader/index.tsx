import * as React from 'react';
import classnames from 'classnames';
import uuid from '../../utils/uuid';
import { Omit } from '../../typings';

export interface IContentLoaderProps extends React.SVGAttributes<HTMLOrSVGElement> {
  /**
   * The content of the component
   */
  children: React.ReactNode;
  /**
   * Color from theme
   */
  color?: string;
  /**
   * The CSS class name of the root element
   */
  className?: string;
  /**
   * Height of component in `px`
   */
  height?: number;
  /**
   * Width of component in `px`
   */
  width?: number;
}

export class ContentLoader extends React.PureComponent<IContentLoaderProps> {
  public static defaultProps: Omit<IContentLoaderProps, 'children'> = {
    color: 'grey',
    height: 300,
    width: 300,
  };

  render(): JSX.Element {
    const {
      color,
      className,
      height,
      width,
      children,
      ...other
    } = this.props;
    const idClip = uuid();
    const idGradient = uuid();

    return (
      <svg
        {...other}
        data-component="content_loader"
        viewBox={`0 0 ${width} ${height}`}
        className={classnames('content_loader', className)}
      >
        <rect
          style={{ fill: `url(#${idGradient})` }}
          clipPath={`url(#${idClip})`}
          x="0"
          y="0"
          width={width}
          height={height}
        />
        <defs>
          <clipPath id={idClip}>
            {children}
          </clipPath>
          <linearGradient id={idGradient}>
            <stop offset="0%" className={`content_loader_color_${color}`} />
            <stop offset="50%" className={`content_loader_color_${color}`} />
            <stop offset="100%" className={`content_loader_color_${color}`} />
          </linearGradient>
        </defs>
      </svg>
    );
  }
}
