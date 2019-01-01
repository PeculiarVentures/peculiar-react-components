import * as React from 'react';
import classnames from 'classnames';

export interface ILinearProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Progress line color from theme
   */
  color?: string;
  /**
   * Background line color from theme
   */
  colorProgress?: string;
  /**
   * Current progress value
   */
  value?: number;
  /**
   * The CSS class name of the root element
   */
  className?: string;
}

export class LinearProgress extends React.PureComponent<ILinearProgressProps> {
  public static defaultProps: ILinearProgressProps = {
    color: 'light_grey',
    colorProgress: 'primary',
    value: 0,
  };

  private getValue(): number {
    const { value } = this.props;

    if (value > 100) {
      return 100;
    }

    if (value < 0) {
      return 0;
    }

    return value;
  }

  render(): JSX.Element {
    const {
      value: valueProp,
      color,
      colorProgress,
      className,
      ...other
    } = this.props;
    const value = this.getValue();

    return (
      <div
        {...other}
        data-component="linear_progress"
        // tslint:disable-next-line
        className={classnames(
          'linear_progress',
          'round_small',
          [`fill_${color}`],
          className,
        )}
      >
        <div
          // tslint:disable-next-line
          className={classnames(
            'linear_progress_value',
            'round_small',
            [`fill_${colorProgress}`],
          )}
          style={{ width: `${value}%` }}
        />
      </div>
    );
  }
}
