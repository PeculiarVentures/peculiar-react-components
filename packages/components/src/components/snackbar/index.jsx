import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

/**
 * Snackbar component
 */
export default class Snackbar extends PureComponent {
  static propTypes = {
    /**
     * The number of milliseconds to wait before automatically calling
     * the onClose function. onClose should then set the state of
     * the open prop to hide the Snackbar. This behavior is disabled by
     * default with the null value.
     */
    autoHideDuration: PropTypes.number,
    /**
     * This is what will be displayed inside the Snackbar.
     */
    children: PropTypes.node.isRequired,
    /**
     * The CSS class name of the root element.
     */
    className: PropTypes.string,
    /**
     * Callback fired when the component requests to be closed.
     */
    onClose: PropTypes.func,
    /**
     * Callback function fired when the component mouse leave.
     */
    onMouseLeave: PropTypes.func,
    /**
     * Callback function fired when the component mouse enter.
     */
    onMouseEnter: PropTypes.func,
    /**
     * If true, Snackbar is open.
     */
    open: PropTypes.bool,
    /**
     * If true, Snackbar has `width: 100%`.
     */
    fullWidth: PropTypes.bool,
    /**
     * Vertical position for Snackbar.
     */
    verticalPosition: PropTypes.oneOf(['top', 'bottom']),
    /**
     * Horizontal position for Snackbar.
     */
    horizontalPosition: PropTypes.oneOf(['left', 'center', 'right']),
    /**
     * The action to display.
     */
    action: PropTypes.node,
    /**
     * Component color from theme.
     */
    color: PropTypes.string,
    /**
     * Component text color from theme.
     */
    textColor: PropTypes.string,
  };

  static defaultProps = {
    autoHideDuration: undefined,
    className: undefined,
    onClose() {},
    onMouseLeave() {},
    onMouseEnter() {},
    open: false,
    fullWidth: true,
    verticalPosition: 'bottom',
    horizontalPosition: 'left',
    action: null,
    color: 'black',
    textColor: 'white',
  };

  state = {
    open: false,
    exiting: true,
  };

  componentDidMount() {
    const { open } = this.props;

    if (open) {
      this._setAutoHideTimer();
    }
  }

  componentDidUpdate(prevProps) {
    const { open } = this.props;

    if (prevProps.open !== open) {
      if (open) {
        this.setState({ // eslint-disable-line
          exiting: false,
        }, () => {
          setTimeout(() => {
            this.setState({
              open: true,
            });
          }, 10);
        });

        this._setAutoHideTimer();
      } else {
        clearTimeout(this.timerAutoHide);

        this.setState({ // eslint-disable-line
          open: false,
        });
      }
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timerAutoHide);
  }

  /**
   * Set timer for fire onClose callback
   * @param {number} duration
   */
  _setAutoHideTimer(duration = null) {
    const { onClose, autoHideDuration } = this.props;

    if (!onClose || !autoHideDuration) {
      return;
    }

    clearTimeout(this.timerAutoHide);

    this.timerAutoHide = setTimeout(() => {
      if (!onClose || !autoHideDuration) {
        return;
      }

      onClose(null, 'timeout');
    }, duration || autoHideDuration || 0);
  }

  timerAutoHide = null;
  rootNode = null;

  /**
   * Handler for onMouseEnter event
   */
  _handleMouseEnter = (event) => {
    const { onMouseEnter } = this.props;

    if (onMouseEnter) {
      onMouseEnter(event);
    }

    this._handlePause();
  };

  /**
   * Handler for onMouseLeave event
   */
  _handleMouseLeave = (event) => {
    const { onMouseLeave } = this.props;

    if (onMouseLeave) {
      onMouseLeave(event);
    }

    this._handleResume();
  };

  /**
   * Stop auto hide timer
   */
  _handlePause = () => {
    clearTimeout(this.timerAutoHide);
  };

  /**
   * Start auto hide timer
   */
  _handleResume = () => {
    const { autoHideDuration } = this.props;

    if (autoHideDuration) {
      this._setAutoHideTimer((autoHideDuration || 0) * 0.5);
    }
  };

  /**
   * Handler for onTransitionEnd event
   */
  _handleTransitionEnd = (e) => {
    e.preventDefault();

    const { open } = this.state;

    if (e.target === e.currentTarget && !open) {
      this.setState({
        exiting: true,
      });
    }
  }

  /**
   * render
   * @return {ReactElement} markup
   */
  render() {
    const {
      autoHideDuration,
      children,
      className,
      onClose,
      onMouseLeave,
      onMouseEnter,
      open: openProp,
      fullWidth,
      verticalPosition,
      horizontalPosition,
      action,
      color,
      textColor,
      ...other
    } = this.props;
    const { exiting, open } = this.state;

    if (exiting) {
      return null;
    }

    return (
      <div
        data-component="snackbar"
        className={classNames(
          'snackbar',
          [`snackbar_vertical_position_${verticalPosition}`],
          [`snackbar_horizontal_position_${horizontalPosition}`],
          {
            snackbar_full_width: fullWidth,
          },
          className,
        )}
        onMouseEnter={this._handleMouseEnter}
        onMouseLeave={this._handleMouseLeave}
        {...other}
      >
        <div
          className={classNames(
            'snackbar_container',
            {
              snackbar_open: open,
            },
            [`fill_${color}`],
          )}
          onTransitionEnd={this._handleTransitionEnd}
        >
          <div
            className={classNames(
              'snackbar_content',
              'break_word',
              [`text_${textColor}`],
            )}
          >
            {children}
          </div>
          {action && (
            <div className="snackbar_action">
              {action}
            </div>
          )}
        </div>
      </div>
    );
  }
}
