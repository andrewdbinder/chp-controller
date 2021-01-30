import React from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';
import Container from 'react-bootstrap/Container';

import MainController from './components/Controller';
import Settings from './components/Settings';

import Footer from './components/Footer';

// import { channels } from './components/constants';

// import 'bootstrap/dist/js/bootstrap.js';
import 'bootstrap/dist/css/bootstrap.min.css';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
class Hello extends React.Component<any, any> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(props: any) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Container className="controllerparent">
        <MainController />
      </Container>
    );
  }
}

export default function App() {
  return (
    <HashRouter>
      <Switch>
        <Route exact path="/" component={Hello} />
        <Route path="/settings" component={Settings} />
      </Switch>
      <Footer />
    </HashRouter>
  );
}
