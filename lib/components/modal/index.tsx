import * as React from 'react';
import * as ReactDOM from 'react-dom';
import classNames from 'classnames';
import { Omit } from '../../typings';

export interface IModalProps {
  /**
   * This is what will be displayed inside the component
   */
  children: React.ReactNode;
  transparent?: boolean;
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
}

export class Modal extends React.Component<IModalProps> {
  public static defaultProps: Omit<IModalProps, 'children'> = {
    color: 'white',
  };

  public rootElement: Element;
  public bodyElement: Element;

  constructor(props: IModalProps) {
    super(props);

    this.bodyElement = window.document.body;

    this.rootElement = document.createElement('div');

    this.rootElement.className = classNames(
      'modal',
      [`fill_${props.color}`],
      { m_transparent: props.transparent },
      props.className,
    );
  }

  componentDidMount() {
    this.bodyElement.appendChild(this.rootElement);
    this.bodyElement.addEventListener('keyup', this.onKeyUp);
    this.rootElement.addEventListener('click', this.onClick);
  }

  componentWillUnmount() {
    this.bodyElement.removeChild(this.rootElement);
    this.bodyElement.removeEventListener('keyup', this.onKeyUp);
    this.rootElement.removeEventListener('click', this.onClick);
  }

  public onKeyUp = (e: KeyboardEvent): void => {
    const { onClose } = this.props;

    if (e.keyCode === 27 && onClose) {
      onClose();
    }
  }

  public onClick = (e: MouseEvent): void => {
    const { onClose } = this.props;

    if (e.target === this.rootElement && onClose) {
      onClose();
    }
  }

  render(): JSX.Element {
    const { children } = this.props;

    return ReactDOM.createPortal(
      children,
      this.rootElement,
    );
  }
}
