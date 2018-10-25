import React, { PureComponent } from 'react'; // eslint-disable-line
import PropTypes from 'prop-types';

/**
 * ProgressiveImage component
 */
export default class ProgressiveImage extends PureComponent {
  static propTypes = {
    children: PropTypes.func.isRequired,
    /**
     * Fired when an error occurs when uploading a picture
     */
    onError: PropTypes.func,
    /**
     * Path to preloaded image
     */
    placeholder: PropTypes.string,
    /**
     * Path to main image
     */
    src: PropTypes.string,
  };

  static defaultProps = {
    onError() {},
    placeholder: '',
    src: '',
  }

  state = {
    image: this.props.placeholder,
    loading: true,
  };

  componentDidMount() {
    const { src } = this.props;

    this._loadImage(src);
  }

  componentWillReceiveProps(nextProps) {
    const { src } = this.props;
    const { src: nextSrc, placeholder } = nextProps;

    if (nextSrc !== src) {
      this.setState({
        image: placeholder,
        loading: true,
      }, () => {
        this._loadImage(nextSrc);
      });
    }
  }

  componentWillUnmount() {
    if (this.image) {
      this.image.onload = null;
      this.image.onerror = null;
    }
  }

  /**
   * On load handler
   */
  _onLoad = () => {
    const { src } = this.props;

    this.setState({
      image: src,
      loading: false,
    });
  };

  /**
   * On error load handler
   * @param {SytheticEvent} e
   */
  _onError = (e) => {
    const { onError } = this.props;

    if (onError) {
      onError(e);
    }
  };

  /**
   * Load image handler
   * @param {string} src
   */
  _loadImage = (src) => {
    if (this.image) {
      this.image.onload = null;
      this.image.onerror = null;
    }

    const image = new Image();

    this.image = image;
    image.onload = this._onLoad;
    image.onerror = this._onError;
    image.src = src;
  };

  /**
   * render
   * @return {ReactElement} markup
   */
  render() {
    const { image, loading } = this.state;
    const { children } = this.props;

    if (!children || typeof children !== 'function') {
      throw new Error('ProgressiveImage requires a function as its only child');
    }

    return children(image, loading);
  }
}
