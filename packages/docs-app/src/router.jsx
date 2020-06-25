import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import ReactLoadable from 'react-loadable';
import { CircularProgress } from 'lib-react-components';
import Sidebar from './components/sidebar';
import Content from './components/content';
import Example from './components/example';
import publicPath from './utils/get_build_path';
import pages from './sources/config';

const Landing = ReactLoadable({
  loader: () => import(
    /* webpackChunkName: "landing" */
    './components/landing/index.jsx'),
  loading: () => <CircularProgress />,
});

export default function Router() {
  const routes = [];

  pages.forEach(g => (
    g.children && g.children.forEach(p => routes.push(
      <Route
        key={p.pathname}
        path={p.pathname}
        render={() => (
          <Content>
            <Example
              path={p.pathname}
              title={p.title}
              component={Example}
            />
          </Content>
        )}
      />,
    ))
  ));

  return (
    <BrowserRouter basename={publicPath}>
      <div
        style={{
          height: '100%',
          display: 'flex',
        }}
      >
        <Sidebar
          pages={pages}
        />
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <Content>
                <Landing
                  pages={pages.filter(p => p.value === 'demos')[0].children}
                />
              </Content>
            )}
          />
          {routes}
          <Redirect to="/" />
        </Switch>
      </div>
    </BrowserRouter>
  );
}
