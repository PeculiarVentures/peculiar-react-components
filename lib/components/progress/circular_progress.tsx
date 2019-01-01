import * as React from 'react';
import classnames from 'classnames';

export interface ICircularProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The CSS class name of the root element.
   */
  className?: string;
  /**
   * The color of the static circle element.
   */
  color?: string;
  /**
   * The color of the progress circle element.
   */
  colorProgress?: string;
  /**
   * The size of the circle.
   */
  size?: number;
  /**
   * The style of the root element.
   */
  style?: React.CSSProperties;
  /**
   * The thickness of the circle.
   */
  thickness?: number;
}

export class CircularProgress extends React.PureComponent<ICircularProgressProps> {
  private SIZE: number = 50;

  public static defaultProps: ICircularProgressProps = {
    color: 'light_grey',
    colorProgress: 'primary',
    size: 24,
    thickness: 4,
  };

  render() {
    const {
      className,
      color,
      colorProgress,
      size,
      thickness,
      style,
      ...other
    } = this.props;

    return (
      <div
        {...other}
        data-component="circular_progress"
        className={classnames('circle_progress', className)}
        // tslint:disable-next-line
        style={{
          ...style,
          width: size,
          height: size,
        }}
      >
        <svg
          className="circle_progress_svg"
          viewBox={`0 0 ${this.SIZE} ${this.SIZE}`}
        >
          <circle
            className={`circle_progress_stroke_${color}`}
            cx={this.SIZE / 2}
            cy={this.SIZE / 2}
            r={(this.SIZE / 2) - 5}
            fill="none"
            strokeWidth={thickness}
          />
          <circle
            // tslint:disable-next-line
            className={classnames(
              'circle_progress_circle',
              [`circle_progress_stroke_${colorProgress}`],
            )}
            cx={this.SIZE / 2}
            cy={this.SIZE / 2}
            r={(this.SIZE / 2) - 5}
            fill="none"
            strokeWidth={thickness}
          />
        </svg>
      </div>
    );
  }
}
