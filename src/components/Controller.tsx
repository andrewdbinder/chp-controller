import React from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';

import CodeButton from './controller/CodeButton';
import SirenButton from './controller/SirenButton';
import TrafficAdvisorButton from './controller/TrafficAdvisorButton';
import HornButton from './controller/HornButton';
import SceneButton from './controller/SceneButton';
import TransmissionButton from './controller/TransmissionButton';
import HeadlightButton from './controller/HeadlightButton';
import MomentaryToggleButtons from './controller/MomentaryButton';
import IndicatorButton from './controller/IndicatorButton';

import * as CHP_States from './states.json';
import { channels } from './channels';

const { ipcRenderer } = window.require('electron');

type EmergencyState = {
  Code1: string;
  Code2: string;
  Code3: string;
  TrafficAdvisor: string;
  ContinuousSiren: string;
  IntermittentSiren: string;
};

type SceneState = {
  Takedown_S: boolean;
  D_Alley_S: boolean;
  P_Alley_S: boolean;
  D_Spot_S: boolean;
  P_Spot_S: boolean;
};

type VehicleState = {
  Gear: string;
  Headlights: string;
  Brights: boolean;
  Brakes: boolean;
  Indicator: string;
  HORN: boolean;
};

type CHPState = {
  EmergencyState: EmergencyState;
  SceneState: SceneState;
  VehicleState: VehicleState;
};

type ControllerState = {
  CHPState: CHPState;
};

class MainController extends React.Component<any, ControllerState> {
  static StateChange(command: string) {
    // console.log(command);
    ipcRenderer.send(channels.CHP_STATE_CHANGE, command);
  }

  constructor(props: any) {
    super(props);
    this.state = {
      CHPState: {
        EmergencyState: {
          Code1: 'OFF',
          Code2: 'OFF',
          Code3: 'OFF',
          TrafficAdvisor: 'OFF',
          ContinuousSiren: 'OFF',
          IntermittentSiren: 'OFF',
        },
        SceneState: {
          Takedown_S: false,
          D_Alley_S: false,
          P_Alley_S: false,
          D_Spot_S: false,
          P_Spot_S: false,
        },
        VehicleState: {
          Gear: 'DRIVE',
          Headlights: 'OFF',
          Brights: false,
          Brakes: false,
          Indicator: 'OFF',
          HORN: false,
        },
      },
    };
  }

  componentDidMount() {
    // ipcRenderer.send(channels.CHP_STATE_CHANGE, ')');
    ipcRenderer.on(channels.GET_CHP_STATE, (event, arg) => {
      const { CHPState } = arg;
      this.setState({ CHPState });
    });
  }

  componentWillUnmount() {
    ipcRenderer.removeAllListeners(channels.GET_CHP_STATE);
  }

  render() {
    const { CHPState } = this.state;

    return (
      <Container className="controller">
        <Row style={{ height: '25%' }}>
          <Col>
            <p className="col-form-label">Code 1</p>
            <CodeButton
              state={CHPState.EmergencyState.Code1}
              properties={CHP_States.code1}
              enabled
              StateChange={MainController.StateChange}
            />
          </Col>
          <Col>
            <p className="col-form-label">Code 2</p>
            <CodeButton
              state={CHPState.EmergencyState.Code2}
              properties={CHP_States.code2}
              enabled
              StateChange={MainController.StateChange}
            />
          </Col>
          <Col>
            <p className="col-form-label">Code 3</p>
            <CodeButton
              state={CHPState.EmergencyState.Code3}
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
              state={CHPState.EmergencyState.ContinuousSiren}
              properties={CHP_States.con_siren}
              StateChange={MainController.StateChange}
              enabled
            />
          </Col>
          <Col>
            <p className="col-form-label">Traffic Advisor</p>
            <TrafficAdvisorButton
              className="w-100 h-50"
              state={CHPState.EmergencyState.TrafficAdvisor}
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
                state={CHPState.SceneState.D_Spot_S}
                properties={CHP_States.scene.d_spot}
                activeVariant={CHP_States.scene.ActiveVariant}
                text="Left"
                enabled
                StateChange={MainController.StateChange}
              />
              <SceneButton
                className="h-50"
                state={CHPState.SceneState.P_Spot_S}
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
                state={CHPState.SceneState.D_Alley_S}
                properties={CHP_States.scene.d_alley}
                activeVariant={CHP_States.scene.ActiveVariant}
                text="Left Alley"
                enabled
                StateChange={MainController.StateChange}
              />
              <SceneButton
                className="h-50"
                state={CHPState.SceneState.Takedown_S}
                properties={CHP_States.scene.takedown}
                activeVariant={CHP_States.scene.ActiveVariant}
                text="Takedown"
                enabled
                StateChange={MainController.StateChange}
              />
              <SceneButton
                className="h-50"
                state={CHPState.SceneState.P_Alley_S}
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
                MainController.StateChange('(');
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
            <Button
              className="mx-2 w-25 h-50"
              variant="dark"
              onClick={(e) => {
                MainController.StateChange(')');
              }}
              enabled
            >
              Reset All
            </Button>
          </Col>
        </Row>
        <Row style={{ height: '12.5%' }}>
          <Col>
            <TransmissionButton
              properties={CHP_States.transmission}
              state={CHPState.VehicleState.Gear}
              enabled
              className="w-100 h-100"
              StateChange={MainController.StateChange}
            />
          </Col>
          <Col md={2}>
            <HeadlightButton
              properties={CHP_States.headlights}
              state={CHPState.VehicleState.Headlights}
              enabled
              className="w-100 h-100"
              StateChange={MainController.StateChange}
            />
          </Col>
          <Col md={2}>
            <MomentaryToggleButtons
              properties={CHP_States.brights}
              state={CHPState.VehicleState.Brights}
              enabled
              className="w-100 h-100"
              activeVariant="primary"
              StateChange={MainController.StateChange}
            />
          </Col>
          <Col md={2}>
            <MomentaryToggleButtons
              properties={CHP_States.brakes}
              state={CHPState.VehicleState.Brakes}
              enabled
              className="w-100 h-100"
              activeVariant="primary"
              StateChange={MainController.StateChange}
            />
          </Col>
          <Col>
            <IndicatorButton
              className="w-100 h-100"
              state={CHPState.VehicleState.Indicator}
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

export default MainController;
