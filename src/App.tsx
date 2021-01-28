import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Container from 'react-bootstrap/Container';

import MainController from './components/Controller';
import Footer from './components/Footer';

// import { channels } from './components/constants';

// import 'bootstrap/dist/js/bootstrap.js';
import 'bootstrap/dist/css/bootstrap.min.css';

class Hello extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {};

    // this.StateChange = this.StateChange.bind(this);
  }

  render() {
    return (
      <Container className="controllerparent">
        <MainController />
        <Footer />
      </Container>
    );
  }
}

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Hello} />
      </Switch>
    </Router>
  );
}
