import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import ReactMarkdown from 'react-markdown';
import Loadable from 'react-loadable';
import { Link } from 'react-router-dom';
import {
  CircularProgress,
  HighlightCode,
  Typography,
  validator,
} from 'lib-react-components';
import publicPath from '../../utils/get_build_path';
import s from './styles/index.sass';

export default function Example(props) {
  const { path } = props;

  function Data({ data }) { // eslint-disable-line
    return (
      <div className={s.example_wrapper}>
        {data.map((d, index) => {
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
              className={classNames(
                s.markdown_container,
                'text_black',
                'b2',
              )}
              key={index} // eslint-disable-line
              source={d}
              skipHtml
              renderers={{
                code: elProps => (
                  <HighlightCode lang={elProps.language === 'sh' ? 'bash' : elProps.language}>
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
                      to={`${publicPath}${elProps.href}`}
                      href={`${publicPath}${elProps.href}`}
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
