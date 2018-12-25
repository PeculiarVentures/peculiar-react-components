import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {
  Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import { asyncComponent } from 'react-async-component';
import { IntlWrapper } from 'lib-pintl';
import history from './utils/history';

const Main = asyncComponent({
  resolve: () => import('./containers/main'),
});

interface IRoutingState {
  messages: Record<string, string>;
  lang: string;
}

class Routing extends React.Component<{}, IRoutingState> {
  isEdge: boolean;
  isCryptoSupport: boolean;

  state = {
    lang: 'en',
    messages: {},
  };

  constructor(props: any) {
    super(props);

    this.handleLang();
  }

  handleLang = (value?: 'en' | 'nl') => {
    if (value) {
      localStorage.setItem('[[lang]]', value);

      const messages = import(`./assets/langs/${value}.yaml`);

      messages.then((response) => {
        this.setState({
          lang: value,
          messages: response.default,
        });
      });

      return;
    }

    const lang = localStorage.getItem('[[lang]]') || 'en';
    const messages = import(`./assets/langs/${lang}.yaml`);

    messages.then((response) => {
      this.setState({
        lang,
        messages: response.default,
      });
    });
  }

  render() {
    const { lang, messages } = this.state;

    return (
      <IntlWrapper
        lang={lang}
        messages={messages}
      >
        <Router history={history}>
          <Switch>
            <Route exact={true} path="/" component={Main} />
            <Redirect to="/" />
          </Switch>
        </Router>
      </IntlWrapper>
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
