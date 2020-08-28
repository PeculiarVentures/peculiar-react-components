import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Prism from 'prismjs';
import classNames from 'classnames';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-c';
import 'prismjs/components/prism-glsl';
import 'prismjs/components/prism-json';

/**
 * Highlight component
 */
export default class HighlightCode extends PureComponent {
  static propTypes = {
    /**
     * This is what will be displayed inside the component
     */
    children: PropTypes.node.isRequired,
    /**
     * Supported highlighting languages
     */
    lang: PropTypes.oneOf([
      'css',
      'html',
      'javascript',
      'js',
      'jsx',
      'markup',
      'svg',
      'xml',
      'bash',
      'glsl',
      'none',
      'json',
    ]),
    /**
     * Component root element class name.
     */
    className: PropTypes.string,
  };

  static defaultProps = {
    lang: 'js',
    className: undefined,
  };

  componentDidMount() {
    this._highlight();
  }

  componentDidUpdate() {
    this._highlight();
  }

  codeRef = React.createRef();

  _highlight() {
    if (this.codeRef && this.codeRef.current) {
      Prism.highlightElement(this.codeRef.current);
    }
  }

  /**
   * render
   * @return {ReactElement} markup
   */
  render() {
    const {
      children,
      lang,
      className,
      ...other
    } = this.props;

    return (
      <pre
        data-component="highlight_code"
        className={classNames(
          className,
          `language-${lang}`,
        )}
        {...other}
      >
        <code
          ref={this.codeRef}
          className={`language-${lang}`}
        >
          {children}
        </code>
      </pre>
    );
  }
}
