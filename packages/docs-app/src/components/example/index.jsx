import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import Loadable from 'react-loadable';
import { Link } from 'react-router-dom';
import {
  CircularProgress,
  HighlightCode,
  Typography,
  validator,
} from 'lib-react-components';
import s from './styles/index.sass';

export default function Example(props) {
  const { path } = props;

  function Data({ data }) { // eslint-disable-line
    return (
      <div className={s.example_wrapper}>
        {data.default.map((d, index) => {  // eslint-disable-line
          if (d.type === 'demo') {
            let DemoComponent = () => null;
            let DemoCode = () => null;

            if (d.options.execute !== 'false') {
              DemoComponent = Loadable({
                loader: () => import(
                  /* webpackChunkName: "[request]" */
                  `../../sources${d.options.demo}`)
                  .then(Module => () => (
                    <div className={s.demo_container}>
                      <Module.default />
                    </div>
                  )),
                loading: () => <CircularProgress />,
              });
            }
            if (d.options.showCode === 'true') {
              DemoCode = () => (
                <HighlightCode lang="jsx">
                  {d.data}
                </HighlightCode>
              );
            }

            return ( // eslint-disable-next-line
              <Fragment key={index}>
                <DemoComponent />
                <DemoCode />
              </Fragment>
            );
          }

          return (
            <ReactMarkdown
              remarkPlugins={[gfm]}
              className={classNames(
                s.markdown_container,
                'text_black',
                'b2',
              )}
              key={index} // eslint-disable-line
              children={d}
              skipHtml
              components={{
                code: elProps => {
                  if (elProps.inline) {
                    return (
                      <code
                        className="fill_light_grey"
                        style={{
                          padding: '0px 7px',
                          display: 'inline-block',
                          borderRadius: '3px',
                        }}
                      >
                        {elProps.children.toString()}
                      </code>
                    );
                  }

                  return (
                    <HighlightCode>
                      {elProps.children.toString()}
                    </HighlightCode>
                  );
                },
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
                  if (validator(elProps.href, ['url'])) {
                    return (
                      <a
                        href={elProps.href}
                        className="text_primary"
                      >
                        {elProps.children}
                      </a>
                    );
                  }

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

  const MDComponent = Loadable({
    loader: () => import(
      /* webpackChunkName: "[request]" */
      `../../sources${path}/index.md`)
      .then(data => () => <Data data={data} />),
    loading: () => <CircularProgress />,
  });

  return <MDComponent />;
}

Example.propTypes = {
  path: PropTypes.string,
};

Example.defaultProps = {
  path: '',
};
