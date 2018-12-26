import * as React from 'react';
import classnames from 'classnames';
import { asyncComponent } from 'react-async-component';
import ReactMarkdown from 'react-markdown';
import { Link } from 'react-router-dom';
import { Typography, HighlightCode } from 'lib-react-components';
import * as s from './styles/index.sass';

interface IExampleProps {
  path: string;
}

// interface IExampleState {}

export default class Example extends React.Component<IExampleProps> {
  render() {
    const { path } = this.props;

    function Data(props: any) {
      const { data } = props;

      return (
        <div className={s.example_wrapper}>
          {data.default.map((d: any, index: number) => {
            if (d.type === 'demo') {
              let DemoComponent: any = () => null;
              let DemoCode: any = () => null;

              if (d.options.execute !== 'false') {
                DemoComponent = asyncComponent({
                  resolve: () => import(
                    /* webpackChunkName: "[request]" */
                    `../../docs${d.options.demo}`)
                    .then(Module => () => (
                      <div className={s.demo_container}>
                        <Module.default />
                      </div>
                    )),
                });
              }

              if (d.options.showCode === 'true') {
                DemoCode = () => (
                  <HighlightCode lang="jsx">
                    {d.data}
                  </HighlightCode>
                );
              }

              return (
                <React.Fragment key={index}>
                  <DemoComponent />
                  <DemoCode />
                </React.Fragment>
              );
            }

            return (
              <ReactMarkdown
                className={classnames(s.markdown_container, 'text_black', 'b2')}
                key={index}
                source={d}
                skipHtml={true}
                renderers={{
                  code: elProps => (
                    <HighlightCode
                      lang={elProps.language === 'sh' ? 'bash' : elProps.language}
                    >
                      {elProps.value}
                    </HighlightCode>
                  ),
                  inlineCode: elProps => (
                    <code
                      className="fill_light_grey"
                      style={{
                        padding: '0px 7px',
                        display: 'inline-block',
                        borderRadius: '3px',
                      }}
                    >
                      {elProps.value}
                    </code>
                  ),
                  heading: elProps => (
                    <Typography type={`h${elProps.level}`}>
                      {elProps.children}
                    </Typography>
                  ),
                  paragraph: elProps => (
                    <Typography type="b2">
                      {elProps.children}
                    </Typography>
                  ),
                  link: (elProps) => {
                    // if (validator(elProps.href, ['url'])) {
                    //   return (
                    //     <a
                    //       href={elProps.href}
                    //       className="text_primary"
                    //     >
                    //       {elProps.children}
                    //     </a>
                    //   );
                    // }
  
                    return (
                      <Link
                        to={elProps.href}
                        href={elProps.href}
                        className="text_primary"
                      >
                        {elProps.children}
                      </Link>
                    );
                  },
                }}
              />
            );
          })}
        </div>
      );
    }

    const MDComponent = asyncComponent({
      resolve: () => import(
        /* webpackChunkName: "[request]" */
        `../../docs${path}/index.md`)
        .then(data => () => <Data data={data} />),
    });

    return (
      <MDComponent />
    );
  }
}
