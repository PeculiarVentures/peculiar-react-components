import * as React from 'react';

export interface IProgressiveImageProps {
  children: (image: string, loading: boolean) => React.ReactNode;
  /**
   * Fired when an error occurs when uploading a picture
   */
  onError?: (e: Event) => void;
  /**
   * Path to preloaded image
   */
  placeholder: string;
  /**
   * Path to main image
   */
  src: string;
}

interface IProgressiveImageState {
  image: string;
  loading: boolean;
}

export class ProgressiveImage
  extends React.PureComponent<IProgressiveImageProps, IProgressiveImageState> {
  public image: HTMLImageElement;

  constructor(props: IProgressiveImageProps) {
    super(props);

    this.state = {
      image: props.placeholder,
      loading: true,
    };
  }

  componentDidMount() {
    const { src } = this.props;

    this.loadImage(src);
  }

  componentWillReceiveProps(nextProps: IProgressiveImageProps) {
    const { src } = this.props;
    const { src: nextSrc, placeholder } = nextProps;

    if (nextSrc !== src) {
      this.setState(
        {
          image: placeholder,
          loading: true,
        },
        this.loadImage.bind(this, nextSrc),
      );
    }
  }

  componentWillUnmount() {
    if (this.image) {
      this.image.onload = null;
      this.image.onerror = null;
    }
  }

  private onLoad() {
    const { src } = this.props;

    this.setState({
      image: src,
      loading: false,
    });
  }

  private onError(e: Event) {
    const { onError } = this.props;

    if (onError) {
      onError(e);
    }
  }

  private loadImage(src: string) {
    if (this.image) {
      this.image.onload = null;
      this.image.onerror = null;
    }

    const image = new Image();

    this.image = image;
    image.onload = this.onLoad.bind(this);
    image.onerror = this.onError.bind(this);
    image.src = src;
  }

  render() {
    const { image, loading } = this.state;
    const { children } = this.props;

    if (!children || typeof children !== 'function') {
      throw new Error('ProgressiveImage requires a function as its only child');
    }

    return children(image, loading);
  }
}
