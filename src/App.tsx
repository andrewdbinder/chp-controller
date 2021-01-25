import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';

import Footer from './CHP_Components/Footer';
import CodeButton from './CHP_Components/Controller Components/CodeButton';
import TrafficAdvisorButton from './CHP_Components/Controller Components/TrafficAdvisorButton';
import SirenButton from './CHP_Components/Controller Components/SirenButton';
import HornButton from './CHP_Components/Controller Components/HornButton';
import SceneButton from './CHP_Components/Controller Components/SceneButton';
import TransmissionButton from './CHP_Components/Controller Components/TransmissionButton';
import HeadlightButton from './CHP_Components/Controller Components/HeadlightButton';
import MomentaryToggleButtons from './CHP_Components/Controller Components/MomentaryButton';
import IndicatorButton from './CHP_Components/Controller Components/IndicatorButton';
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

  constructor(props: any) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Container className="mt-2 controller">
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
        <Row style={{ height: '25%' }}>
          <Col>
            <p className="col-form-label">Siren</p>
            <SirenButton
              className="w-50 h-50"
              state="OFF"
              properties={CHP_States.con_siren}
              StateChange={MainController.StateChange}
              enabled
            />
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
            <HornButton
              className="w-50 h-50"
              StateChange={MainController.StateChange}
              enabled
            />
          </Col>
        </Row>
        <Row style={{ height: '25%' }}>
          <Col>
            <p className="col-form-label">Spotlights</p>
            <ButtonGroup className="w-50 h-100" size="md">
              <SceneButton
                className="h-50"
                state={false}
                properties={CHP_States.scene.d_spot}
                activeVariant={CHP_States.scene.ActiveVariant}
                text="Left"
                enabled
                StateChange={MainController.StateChange}
              />
              <SceneButton
                className="h-50"
                state={false}
                properties={CHP_States.scene.p_spot}
                activeVariant={CHP_States.scene.ActiveVariant}
                text="Right"
                enabled
                StateChange={MainController.StateChange}
              />
            </ButtonGroup>
          </Col>
          <Col>
            <p className="col-form-label">Scene Lighting</p>
            <ButtonGroup className="w-100 h-100" size="md">
              <SceneButton
                className="h-50"
                state={false}
                properties={CHP_States.scene.d_alley}
                activeVariant={CHP_States.scene.ActiveVariant}
                text="Left Alley"
                enabled
                StateChange={MainController.StateChange}
              />
              <SceneButton
                className="h-50"
                state={false}
                properties={CHP_States.scene.takedown}
                activeVariant={CHP_States.scene.ActiveVariant}
                text="Takedown"
                enabled
                StateChange={MainController.StateChange}
              />
              <SceneButton
                className="h-50"
                state={false}
                properties={CHP_States.scene.p_alley}
                activeVariant={CHP_States.scene.ActiveVariant}
                text="Right Alley"
                enabled
                StateChange={MainController.StateChange}
              />
            </ButtonGroup>
          </Col>
          <Col>
            <p className="col-form-label">Off</p>
            <Button
              className="mx-2 w-25 h-50"
              variant="dark"
              onClick={() => {
                MainController.StateChange(')');
              }}
              enabled
            >
              Scene Off
            </Button>
            <Button
              className="mx-2 w-25 h-50"
              variant="dark"
              onClick={(e) => {
                MainController.StateChange('0');
              }}
              enabled
            >
              L/S Off
            </Button>
          </Col>
        </Row>
        <Row style={{ height: '25%' }}>
          <Col>
            <TransmissionButton
              properties={CHP_States.transmission}
              state="PARK"
              enabled
              StateChange={MainController.StateChange}
            />
          </Col>
          <Col md={2}>
            <HeadlightButton
              properties={CHP_States.headlights}
              state="OFF"
              enabled
              className="w-100 h-50"
              StateChange={MainController.StateChange}
            />
          </Col>
          <Col md={2}>
            <MomentaryToggleButtons
              properties={CHP_States.brights}
              state={false}
              enabled
              className="w-100 h-50"
              activeVariant="primary"
              StateChange={MainController.StateChange}
            />
          </Col>
          <Col md={2}>
            <MomentaryToggleButtons
              properties={CHP_States.brakes}
              state={false}
              enabled
              className="w-100 h-50"
              activeVariant="primary"
              StateChange={MainController.StateChange}
            />
          </Col>
          <Col>
            <IndicatorButton
              state="OFF"
              properties={CHP_States.indicators}
              StateChange={MainController.StateChange}
              enabled
            />
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
