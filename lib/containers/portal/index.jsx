/* eslint react/no-find-dom-node: 1 */
import React, { Component } from 'react'; // eslint-disable-line
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

function ownerDocument(node) {
  return (node && node.ownerDocument) || document;
}

function getContainer(container, defaultContainer) {
  container = typeof container === 'function' ? container() : container;

  return ReactDOM.findDOMNode(container) || defaultContainer;
}

function getOwnerDocument(element) {
  return ownerDocument(ReactDOM.findDOMNode(element));
}

/**
 * Portal component
 */
export default class Portal extends Component {
  static propTypes = {
    /**
     * The children to render into the `container`.
     */
    children: PropTypes.node.isRequired,
    /**
     * A node, component instance, or function that returns either.
     * The `container` will have the portal children appended to it.
     * By default, it uses the body of the top-level document object,
     * so it's simply `document.body` most of the time.
     */
    container: PropTypes.oneOfType([ // eslint-disable-line
      PropTypes.object,
      PropTypes.func,
      PropTypes.instanceOf(HTMLElement),
    ]),
    /**
     * Callback fired once the children has been mounted into the `container`.
     */
    onRendered: PropTypes.func,
  };

  static defaultProps = {
    onRendered() {},
  };

  componentDidMount() {
    const { container, onRendered } = this.props;

    this.setContainer(container);
    this.forceUpdate(onRendered);
  }

  componentDidUpdate(prevProps) {
    const { container } = this.props;

    if (prevProps.container !== container) {
      this.setContainer(container);
      this.forceUpdate();
    }
  }

  componentWillUnmount() {
    this.mountNode = null;
  }

  setContainer(container) {
    this.mountNode = getContainer(container, getOwnerDocument(this).body);
  }

  getMountNode = () => this.mountNode;

  render() {
    const { children } = this.props;

    return this.mountNode ? ReactDOM.createPortal(children, this.mountNode) : null;
  }
}
