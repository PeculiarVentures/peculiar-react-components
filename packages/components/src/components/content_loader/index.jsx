import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import uuid from '../../utils/uuid';

/**
 * ContentLoader component
 */
export default class ContentLoader extends PureComponent {
  static propTypes = {
    /**
     * Color from theme
     */
    color: PropTypes.string,
    /**
     * Animation duration
     */
    duration: PropTypes.number,
    /**
     * The CSS class name of the root element
     */
    className: PropTypes.string,
    /**
     * Height of component in px
     */
    height: PropTypes.number,
    /**
     * Width of component in px
     */
    width: PropTypes.number,
    /**
     * The content of the component
     */
    children: PropTypes.node.isRequired,
  };

  static defaultProps = {
    color: 'grey',
    duration: 2,
    className: '',
    height: 300,
    width: 300,
  };

  idClip = uuid();
  idGradient = uuid();

  render() {
    const {
      color,
      duration,
      className,
      height,
      width,
      children,
      ...other
    } = this.props;

    return (
      <svg
        data-component="content-loader"
        viewBox={`0 0 ${width} ${height}`}
        className={classNames(
          'content_loader',
          className,
        )}
        {...other}
      >
        <rect
          style={{ fill: `url(#${this.idGradient})` }}
          clipPath={`url(#${this.idClip})`}
          x="0"
          y="0"
          width={width}
          height={height}
        />

        <defs>
          <clipPath id={this.idClip}>
            {children}
          </clipPath>

          <linearGradient id={this.idGradient}>
            <stop offset="0%" className={`content_loader_color_${color}`} />
            <stop offset="50%" className={`content_loader_color_${color}`} />
            <stop offset="100%" className={`content_loader_color_${color}`} />
          </linearGradient>
        </defs>
      </svg>
    );
  }
}
