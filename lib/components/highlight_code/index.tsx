import * as React from 'react';
import Prism from 'prismjs';
import classnames from 'classnames';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-glsl';
import { Omit } from '../../typings';

export interface IHighlightCodeProps {
  children: React.ReactNode;
  lang?: 'css' |
    'html' |
    'javascript' |
    'js' |
    'jsx' |
    'markup' |
    'svg' |
    'xml' |
    'bash' |
    'glsl' |
    'none';
  className?: string;
}

export class HighlightCode extends React.Component<IHighlightCodeProps> {
  rootNode: HTMLElement;

  public static defaultProps: Omit<IHighlightCodeProps, 'children'> = {
    lang: 'js',
  };

  componentDidMount() {
    this.hightlight();
  }

  componentDidUpdate() {
    this.hightlight();
  }

  private hightlight() {
    const { lang } = this.props;
    const grammar = Prism.languages[lang];
    const repeatSymbol: any = '&nbsp;';
    let _html = this.rootNode.textContent;

    if (grammar) {
      try {
        _html = Prism.highlight(_html, grammar);
      } catch (err) {
        console.warn(`React Components Highlighter: There is an error highlighting lang ${lang}`, err);
      }
    } else {
      _html = _html.replace(/[<>]/g, s => `&#${s.charCodeAt(0)};`);
    }

    // Treat iOS whie-space: pre; behavior
    this.rootNode.innerHTML = _html
      .replace(/\n/g, '<br>')
      .replace(/<br>[ ]+/g, str => `<br>${repeatSymbol.repeat(str.length - 5)}`)
      .replace(/^[ ]+/g, str => repeatSymbol.repeat(str.length));
  }

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
        className={classnames(className, `language-${lang}`)}
      >
        <code
          style={{ whiteSpace: 'nowrap' }}
          ref={(node) => { this.rootNode = node; }}
          className={`language-${lang}`}
        >
          {children}
        </code>
      </pre>
    );
  }
}
