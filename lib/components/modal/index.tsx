import * as React from 'react';
import * as ReactDOM from 'react-dom';
import classnames from 'classnames';
import { Omit } from '../../typings';

export interface IModalProps {
  /**
   * This is what will be displayed inside the component
   */
  children: React.ReactNode;
  /**
   * Opacity value for overlay element from `0` to `1`
   */
  transparent?: number;
  /**
   * The CSS class name of the root element
   */
  className?: string;
  /**
   * Callback function that is fired when the modal close using `escape` key or click on overlay
   */
  onClose?: () => void;
  /**
   * Component background from theme
   */
  color?: string;
  /**
   * Props for content element
   */
  contentProps?: React.HTMLAttributes<HTMLElement>;
  /**
   * Use CSS for align content for vertical and horizontal
   */
  center?: boolean;
}

export class Modal extends React.Component<IModalProps> {
  public static defaultProps: Omit<IModalProps, 'children'> = {
    transparent: 1,
    color: 'white',
    contentProps: {},
    center: false,
  };

  public bodyElement: HTMLElement;
  public rootElement: HTMLElement;

  constructor(props: IModalProps) {
    super(props);

    this.bodyElement = window.document.body;

    this.rootElement = document.createElement('div');
    this.rootElement.className = classnames('modal', props.className);
    this.rootElement.setAttribute('data-component', 'modal');
    this.rootElement.setAttribute('data-center', String(props.center));
  }

  componentDidMount() {
    this.bodyElement.appendChild(this.rootElement);
    this.bodyElement.addEventListener('keyup', this.onKeyUp);
  }

  componentWillUnmount() {
    this.bodyElement.removeChild(this.rootElement);
    this.bodyElement.removeEventListener('keyup', this.onKeyUp);
  }

  private getTransparentValue(): number {
    const { transparent } = this.props;

    if (transparent > 1) {
      return 1;
    }

    if (transparent < 0) {
      return 0;
    }

    return transparent;
  }

  private onKeyUp = (e: KeyboardEvent): void => {
    const { onClose } = this.props;

    if (e.key === 'Escape' && onClose) {
      onClose();
    }
  }

  private onClick = (): void => {
    const { onClose } = this.props;

    if (onClose) {
      onClose();
    }
  }

  private renderContent(): JSX.Element {
    const { children, color, contentProps } = this.props;

    return (
      <React.Fragment>
        <div
          className={classnames('modal_overlay', [`fill_${color}`])}
          style={{ opacity: this.getTransparentValue() }}
          onClick={this.onClick}
        />
        <div
          {...contentProps}
          className={classnames('modal_content', contentProps.className)}
        >
          {children}
        </div>
      </React.Fragment>
    );
  }

  render(): JSX.Element {
    return ReactDOM.createPortal(
      this.renderContent(),
      this.rootElement,
    );
  }
}
