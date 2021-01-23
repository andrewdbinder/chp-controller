import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import Footer from './CHP_Components/Footer';
import CodeButton from './CHP_Components/Controller Components/CodeButton';
import TrafficAdvisorButton from './CHP_Components/Controller Components/TrafficAdvisorButton';
// import MainController from 'src/CHP_Components/Controller.js';
import * as CHP_States from './CHP_Components/states.json';
// import Col from 'react-bootstrap/Col';
// import { channels } from './CHP_Components/constants';

// import 'bootstrap/dist/js/bootstrap.js';
import 'bootstrap/dist/css/bootstrap.min.css';

class MainController extends React.Component<any, any> {
  static StateChange(command: string) {
    console.log(command);
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Container fluid style={{ height: '88vh' }}>
        <Row style={{ height: '25%' }}>
          <Col>
            <p className="col-form-label">Code 1</p>
            <CodeButton
              state="OFF"
              properties={CHP_States.code1}
              enabled
              StateChange={MainController.StateChange}
            />
          </Col>
          <Col>
            <p className="col-form-label">Code 2</p>
            <CodeButton
              state="OFF"
              properties={CHP_States.code2}
              enabled
              StateChange={MainController.StateChange}
            />
          </Col>
          <Col>
            <p className="col-form-label">Code 3</p>
            <CodeButton
              state="OFF"
              properties={CHP_States.code3}
              enabled
              StateChange={MainController.StateChange}
            />
          </Col>
        </Row>

        <Row style={{height: "25%"}}>
          <Col>
            <p className="col-form-label">Siren</p>
            {/*<SirenButton*/}
            {/*  className="w-50 h-50" state={CHPState.EmergencyState.ContinuousSiren}*/}
            {/*  properties={CHP_States.con_siren}*/}
            {/*  enabled={vehicle.enabled_functions.siren}*/}
            {/*/>*/}
          </Col>
          <Col>
            <p className="col-form-label">Traffic Advisor</p>
            <TrafficAdvisorButton
              className="w-100 h-50"
              state="OFF"
              properties={CHP_States.traffic_advisor}
              StateChange={MainController.StateChange}
              enabled
            />
          </Col>
          <Col>
            <p className="col-form-label">Horn</p>
            {/*<HornButton*/}
            {/*  className="w-50 h-50"*/}
            {/*  enabled={vehicle.enabled_functions.horn}*/}
            {/*/>*/}
          </Col>
        </Row>
      </Container>
    );
  }
}

class Hello extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {};

    // this.StateChange = this.StateChange.bind(this);
  }

  render() {
    return (
      <Container>
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
