import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {
  Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import { asyncComponent } from 'react-async-component';
import history from './utils/history';

const Main = asyncComponent({
  resolve: () => import('./containers/main'),
});

class Routing extends React.Component {
  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route exact={true} path="/" component={Main} />
          <Redirect to="/" />
        </Switch>
      </Router>
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
