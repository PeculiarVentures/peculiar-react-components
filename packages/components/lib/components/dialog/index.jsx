import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Button from '../button';
// import s from './styles/index.sss';

const s = {};

/**
 * @class Dialog - Dialog component
 * @example
 *  // Basic usage
 *  import Dialog from './path/to/dialog';
 *
 *  const DialogExample = () => (
 *    <Dialog
 *      title="Dialog title"
 *    />
 *  );
 *
 * @example
 *  // With content
 *  import Dialog from './path/to/dialog';
 *
 *  const DialogExample = () => (
 *    <Dialog
 *      title="Dialog title"
 *    >
 *      Dialog description
 *    </Dialog>
 *  );
 *
 * @example
 *  // Change buttons text
 *  import Dialog from './path/to/dialog';
 *
 *  const DialogExample = () => (
 *    <Dialog
 *      title="Dialog title"
 *      cancelText="Disagree"
 *      acceptText="Agree"
 *    />
 *  );
 *
 * @example
 *  // Change buttons props
 *  import Dialog from './path/to/dialog';
 *
 *  const DialogExample = () => (
 *    <Dialog
 *      title="Dialog title"
 *      cancelButtonProps={{
 *        style: {
 *          opacity: '0.7',
 *        },
 *      }}
 *      acceptButtonProps={{
 *        style: {
 *          opacity: '0.8',
 *        },
 *      }}
 *    />
 *  );
 *
 * @example
 *  // Buttons swap
 *  import Dialog from './path/to/dialog';
 *
 *  const DialogExample = () => (
 *    <Dialog
 *      title="Dialog title"
 *      swapButtons
 *    />
 *  );
 *
 * @example
 *  // With classNames
 *  import Dialog from './path/to/dialog';
 *
 *  const DialogExample = () => (
 *    <Dialog
 *      title="Dialog title"
 *      className="my-wrapper-class"
 *      classNameOverlay="my-overlay-class"
 *      classNameDialog="my-dialog-class"
 *    />
 *  );
 *
 * @example
 *  // With events
 *  import Dialog from './path/to/dialog';
 *
 *  const DialogExample = () => (
 *    <Dialog
 *      title="Dialog title"
 *      onCancel={(e) => { console.log(e); }}
 *      onAccept={(e) => { console.log(e); }}
 *      onClose={(e) => { console.log(e); }}
 *    />
 *  );
 *
 * @example
 *  // With not documented props
 *  import Dialog from './path/to/dialog';
 *
 *  const DialogExample = () => (
 *    <Dialog
 *      title="Dialog title"
 *      style={{
 *        height: '500px',
 *      }}
 *    />
 *  );
 */
export default class Dialog extends PureComponent {
  /**
   * PropTypes
   * @type {{
   *  title: string
   *  children: array
   *  cancelText: array
   *  cancelButtonProps: object
   *  acceptText: array
   *  acceptButtonProps: object
   *  swapButtons: boolean
   *  className: string
   *  classNameOverlay: string
   *  classNameDialog: string
   *  smooth: boolean
   *  onCancel: function
   *  onAccept: function
   *  onClose: function
   * }}
   */
  static propTypes = {
    /**
     * The title to display on the Dialog. Could be number, string, element
     * or an array containing these types
     */
    title: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
      PropTypes.node,
    ]),
    /**
     * The contents of the Dialog
     */
    children: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
      PropTypes.node,
    ]),
    /**
     * The value to display on the Dialog cancel button. Could be number, string, element
     * or an array containing these types
     */
    cancelText: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
      PropTypes.node,
    ]),
    /**
     * The cancel button props
     */
    cancelButtonProps: PropTypes.oneOfType([
      PropTypes.object,
    ]),
    /**
     * The value to display on the Dialog accept button. Could be number, string, element
     * or an array containing these types
     */
    acceptText: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
      PropTypes.node,
    ]),
    /**
     * The accept button props
     */
    acceptButtonProps: PropTypes.oneOfType([
      PropTypes.object,
    ]),
    /**
     * If set to true, Dialog buttons will turn over
     */
    swapButtons: PropTypes.bool,
    /**
     * The css class name of the root element
     */
    className: PropTypes.string,
    /**
     * The css class name of the overlay element
     */
    classNameOverlay: PropTypes.string,
    /**
     * The css class name of the content container element
     */
    classNameDialog: PropTypes.string,
    smooth: PropTypes.bool,
    /**
     * Fired when 'cancel' button click
     */
    onCancel: PropTypes.func,
    /**
     * Fired when 'accept' button click
     */
    onAccept: PropTypes.func,
    /**
     * Fired when the Dialog is requested to be closed by a click outside
     * the Dialog or press escape button
     */
    onClose: PropTypes.func,
  };

  static defaultProps = {
    title: '',
    children: null,
    cancelText: 'Cancel',
    cancelButtonProps: {},
    acceptText: 'Accept',
    acceptButtonProps: {},
    swapButtons: false,
    className: '',
    classNameOverlay: '',
    classNameDialog: '',
    smooth: false,
    onCancel: null,
    onAccept: null,
    onClose: null,
  };

  componentDidMount() {
    document.addEventListener('keydown', this.onEscapePress);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.onEscapePress);
  }

  /**
   * onKeyDown handler
   * @param {SytheticEvent} e
   */
  onEscapePress = (e) => {
    const { onClose } = this.props;

    if (e.keyCode === 27 && onClose) {
      onClose(e);
    }
  }

  /**
   * Render cancel button
   * @return {ReactElement} markup
   */
  renderCancelButton() {
    const { cancelText, cancelButtonProps, onCancel } = this.props;

    return cancelText && (
      <Button
        size="small"
        className={s.button}
        onClick={onCancel}
        {...cancelButtonProps}
      >
        {cancelText}
      </Button>
    );
  }

  /**
   * Render accept button
   * @return {ReactElement} markup
   */
  renderAcceptButton() {
    const { acceptText, acceptButtonProps, onAccept } = this.props;

    return acceptText && (
      <Button
        primary
        size="small"
        className={s.button}
        onClick={onAccept}
        autoFocus
        {...acceptButtonProps}
      >
        {acceptText}
      </Button>
    );
  }

  /**
   * Render buttons
   * @return {ReactElement} markup
   */
  renderButtons() {
    const { cancelText, acceptText, swapButtons } = this.props;

    return (acceptText || cancelText) && (
      <div className={s.buttons}>
        {!swapButtons && this.renderCancelButton()}
        {this.renderAcceptButton()}
        {swapButtons && this.renderCancelButton()}
      </div>
    );
  }

  /**
   * render
   * @return {ReactElement} markup
   */
  render() {
    const {
      title,
      children,
      cancelText,
      acceptText,
      swapButtons,
      cancelButtonProps,
      acceptButtonProps,
      className,
      classNameOverlay,
      classNameDialog,
      smooth,
      onCancel,
      onAccept,
      onClose,
      ...other
    } = this.props;

    return (
      <div
        className={classNames(
          s.c_dialog_wrapper,
          className,
          { [s.m_smooth]: smooth },
        )}
        {...other}
      >
        <div
          className={classNames(
            s.overlay,
            classNameOverlay,
          )}
          onClick={onClose}
        />
        <div className={s.container}>
          <div
            className={classNames(
              s.dialog,
              classNameDialog,
            )}
          >
            {title && (
              <h3 className={classNames(s.title, 'break_word')}>
                {title}
              </h3>
            )}
            <div className={s.content}>
              {children}
            </div>
            {this.renderButtons()}
          </div>
        </div>
      </div>
    );
  }
}
