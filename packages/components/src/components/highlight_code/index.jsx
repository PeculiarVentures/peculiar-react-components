import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Prism from 'prismjs';
import classnames from 'classnames';
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
    children: PropTypes.string.isRequired,
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
    const {
      children,
      lang,
    } = this.props;

    if (this.codeRef && this.codeRef.current) {
      let code;

      if (lang !== 'none') {
        code = Prism.highlight(children, Prism.languages[lang], lang);
      }

      this.codeRef.current.innerHTML = code || children;
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
        {...other}
        data-component="highlight_code"
        className={classnames(
          className,
          `language-${lang}`,
        )}
      >
        <code
          ref={this.codeRef}
          className={`language-${lang}`}
        />
      </pre>
    );
  }
}
