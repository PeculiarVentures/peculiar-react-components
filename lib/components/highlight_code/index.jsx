import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Prism from 'prismjs';
import classNames from 'classnames';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-glsl';

/**
 * Highlight component
 */
export default class HighlightCode extends Component {
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
    ]),
  };

  static defaultProps = {
    lang: 'js',
  }

  componentDidMount() {
    this._hightlight();
  }

  componentDidUpdate() {
    this._hightlight();
  }

  /**
   * Hightlight element
   */
  _hightlight() {
    const { lang } = this.props;
    const grammar = Prism.languages[lang];
    let _html = this.rootNode.textContent;

    if (grammar) {
      try {
        _html = Prism.highlight(_html, grammar, lang);
      } catch (err) {
        console.warn(`React Components Highlighter: There is an error highlighting lang ${lang}`, err);
      }
    } else {
      _html = _html.replace(/[<>]/g, s => `&#${s.charCodeAt(0)};`);
    }

    // Treat iOS whie-space: pre; behavior
    this.rootNode.innerHTML = _html
      .replace(/\n/g, '<br>')
      .replace(/<br>[ ]+/g, str => `<br>${'&nbsp;'.repeat(str.length - 5)}`)
      .replace(/^[ ]+/g, str => '&nbsp;'.repeat(str.length));
  }

  /**
   * render
   * @return {ReactElement} markup
   */
  render() {
    const {
      children,
      lang,
      ...other
    } = this.props;

    return (
      <pre
        data-component="highlight_code"
        {...other}
        className={classNames(
          other.className,
          `language-${lang}`,
        )}
      >
        <code
          style={{
            whiteSpace: 'nowrap',
          }}
          ref={(node) => { this.rootNode = node; }}
          className={`language-${lang}`}
        >
          {children}
        </code>
      </pre>
    );
  }
}