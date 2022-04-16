import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import HTMLElementType from '../../utils/HTMLElementType';

const useEnhancedEffect = typeof window !== 'undefined' ? React.useLayoutEffect : React.useEffect;

function getContainer(container) {
  return typeof container === 'function' ? container() : container;
}

/**
 * Portal component
 */
export default function Portal(props) {
  const { children, container, onRendered } = props;
  const [mountNode, setMountNode] = React.useState(null);

  useEnhancedEffect(() => {
    setMountNode(getContainer(container) || document.body);

    if (onRendered) {
      onRendered();
    }
  }, [container, onRendered]);

  return (
    <React.Fragment>{mountNode ? ReactDOM.createPortal(children, mountNode) : mountNode}</React.Fragment>
  );
};

Portal.propTypes = {
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
    PropTypes.func,
    HTMLElementType,
  ]),
  /**
   * Callback fired once the children has been mounted into the `container`.
   */
  onRendered: PropTypes.func,
};

Portal.defaultProps = {
  onRendered: undefined,
};
