import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {
  BrowserRouter,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import { asyncComponent } from 'react-async-component';
import Example from './components/example';
import Sidebar from './components/sidebar';
import docsConfig from './docs/config';

const Main = asyncComponent({
  resolve: () => import('./containers/main'),
});

class Routing extends React.Component {
  render() {
    const routes: any = [];

    /**
     * Generate docs routes
     */
    docsConfig.forEach(g => (
      g.children && g.children.forEach(p => routes.push(
        <Route
          key={p.pathname}
          path={p.pathname}
          render={() => (
            <Example
              path={p.pathname}
            />
          )}
        />,
      ))
    ));

    return (
      <BrowserRouter>
        <div
          style={{
            height: '100%',
            display: 'flex',
          }}
        >
          <Sidebar
            pages={docsConfig}
          />
          <div
            style={{
              width: '100%',
              overflow: 'auto',
              WebkitOverflowScrolling: 'touch',
            }}
          >
            <Switch>
              <Route exact={true} path="/" component={Main} />
              {routes}
              <Redirect to="/" />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

const root = document.getElementById('root') as HTMLElement;

if (root) {
  root.setAttribute('data-loaded', 'true');

  ReactDOM.render(
    <Routing />,
    root,
  );
}
