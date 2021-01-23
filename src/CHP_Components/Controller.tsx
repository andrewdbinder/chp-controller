// eslint-disable-next-line max-classes-per-file
import React from 'react';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import CodeButton from './Controller Components/CodeButton';

import { channels } from './constants';

import * as CHP_States from './states.json';

const { ipcRenderer } = window.require('electron');


class SirenButton extends React.Component {
  constructor(props) {
    super(props);

    const { properties } = this.props;

    this.state = {
      currentState: properties.states[0],
    };
  }

  componentDidUpdate() {
    const { currentState } = this.state;
    const { state, properties } = this.props;

    if (currentState.CCommand !== state) {
      for (let c = 0; c < properties.states.length; c++) {
        if (properties.states[c].CCommand === state) {
          this.setState({
            currentState: properties.states[c],
          });
        }
      }
    }
  }

  onClick(e, index) {
    if (
      this.state.currentState.CCommand ===
      this.props.properties.states[0].CCommand
    ) {
      ipcRenderer.send(
        channels.CHP_STATE_CHANGE,
        this.props.properties.states[1].SerialCommand
      );
    } else {
      ipcRenderer.send(
        channels.CHP_STATE_CHANGE,
        this.props.properties.states[0].SerialCommand
      );
    }
  }

  render() {
    const { enabled } = this.props;

    return (
      <Button
        className={this.props.className}
        size="md"
        variant={
          this.props.state === 'OFF'
            ? 'dark'
            : this.props.properties.ActiveVariant
        }
        onClick={(e) => {
          this.onClick(e);
        }}
        disabled={!enabled}
      >
        {this.state.currentState.ProperName}
      </Button>
    );
  }
}

class HornButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      variant: 'dark',
    };
    // this.onMouseDown = this.onMouseDown.bind(this);
    // this.onMouseUp = this.onMouseUp.bind(this);
  }

  onMouseDown(e) {
    // ipcRenderer.send(channels.CHP_HORN, true);
    ipcRenderer.send(channels.CHP_STATE_CHANGE, 'g');
    this.setState({ variant: 'primary' });
  }

  onMouseUp(e) {
    // ipcRenderer.send(channels.CHP_HORN, false);
    ipcRenderer.send(channels.CHP_STATE_CHANGE, 'G');
    this.setState({ variant: 'dark' });
  }

  render() {
    const { enabled } = this.props;

    return (
      <Button
        className={this.props.className}
        size="md"
        variant={this.state.variant}
        onMouseUp={(e) => {
          this.onMouseUp(e);
        }}
        onMouseDown={(e) => {
          this.onMouseDown(e);
        }}
        disabled={!enabled}
      >
        Horn
      </Button>
    );
  }
}



class IndicatorButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentState: this.props.properties.states[0],
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.state !== this.props.state) {
      for (let c = 0; c < this.props.properties.states.length; c++) {
        if (this.props.properties.states[c].CCommand === this.props.state) {
          this.setState({
            currentState: this.props.properties.states[c],
          });
        }
      }
    }
  }

  onClick(e, stateReq) {
    if (this.state.currentState === stateReq) {
      ipcRenderer.send(
        channels.CHP_STATE_CHANGE,
        this.props.properties.states[0].SerialCommand
      );
    } else {
      ipcRenderer.send(channels.CHP_STATE_CHANGE, stateReq.SerialCommand);
    }
  }

  render() {
    const { enabled } = this.props;

    return (
      <ButtonGroup className="w-100 h-50">
        {this.props.properties.states.slice(1).map((state) => (
          <Button
            variant={
              this.props.state === state.CCommand
                ? this.props.properties.ActiveVariant
                : 'dark'
            }
            onClick={(e) => {
              this.onClick(e, state);
            }}
            disabled={!enabled}
          >
            {state.ProperName}
          </Button>
        ))}
      </ButtonGroup>
    );
  }
}

class TransmissionButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentState: this.props.properties.states[0],
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.state !== this.props.state) {
      for (let c = 0; c < this.props.properties.states.length; c++) {
        if (this.props.properties.states[c].CCommand === this.props.state) {
          this.setState({
            currentState: this.props.properties.states[c],
          });
        }
      }
    }
  }

  onClick(e, stateReq) {
    ipcRenderer.send(channels.CHP_STATE_CHANGE, stateReq.SerialCommand);
  }

  render() {
    const { enabled } = this.props;

    return (
      <ButtonGroup className="w-100 h-50">
        {this.props.properties.states.map((state) => (
          <Button
            variant={
              this.props.state === state.CCommand
                ? this.props.properties.ActiveVariant
                : 'dark'
            }
            onClick={(e) => {
              this.onClick(e, state);
            }}
            disabled={!enabled}
          >
            {state.ProperName}
          </Button>
        ))}
      </ButtonGroup>
    );
  }
}

class SceneButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentState: this.props.properties.states[0],
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.state !== this.props.state) {
      for (let c = 0; c < this.props.properties.states.length; c++) {
        if (this.props.properties.states[c].CCommand === this.props.state) {
          this.setState({
            currentState: this.props.properties.states[c],
          });
        }
      }
    }
  }

  onClick(e) {
    if (this.state.currentState === this.props.properties.states[0]) {
      ipcRenderer.send(
        channels.CHP_STATE_CHANGE,
        this.props.properties.states[1].SerialCommand
      );
    } else {
      ipcRenderer.send(
        channels.CHP_STATE_CHANGE,
        this.props.properties.states[0].SerialCommand
      );
    }
  }

  render() {
    const { enabled } = this.props;

    return (
      <Button
        className={this.props.className}
        variant={
          this.props.state === this.props.properties.states[0].CCommand
            ? 'dark'
            : this.props.activeVariant
        }
        onClick={(e) => {
          this.onClick(e);
        }}
        disabled={!enabled}
      >
        {this.props.text}
      </Button>
    );
  }
}

class MomentaryToggleButtons extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentState: this.props.properties.states[0],
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.state !== this.props.state) {
      for (let c = 0; c < this.props.properties.states.length; c++) {
        if (this.props.properties.states[c].CCommand === this.props.state) {
          this.setState({
            currentState: this.props.properties.states[c],
          });
        }
      }
    }
  }

  onClick(e) {
    if (this.state.currentState === this.props.properties.states[0]) {
      ipcRenderer.send(
        channels.CHP_STATE_CHANGE,
        this.props.properties.states[1].SerialCommand
      );
    } else {
      ipcRenderer.send(
        channels.CHP_STATE_CHANGE,
        this.props.properties.states[0].SerialCommand
      );
    }
  }

  onMouseDown(e) {
    // this.setState({status: "hold"})

    ipcRenderer.send(
      channels.CHP_STATE_CHANGE,
      this.props.properties.states[1].SerialCommand
    );
  }

  onMouseUp(e) {
    // this.setState({status: "off"})
    ipcRenderer.send(
      channels.CHP_STATE_CHANGE,
      this.props.properties.states[0].SerialCommand
    );
  }

  render() {
    const { enabled } = this.props;

    return (
      <ButtonGroup className={this.props.className} vertical>
        <Button
          size="md"
          variant={
            this.props.state === this.props.properties.states[0].CCommand
              ? 'dark'
              : this.props.activeVariant
          }
          onClick={(e) => {
            this.onClick(e);
          }}
          onMouseDown={(e) => {
            this.onMouseDown(e);
          }}
          onMouseUp={(e) => {
            this.onMouseUp(e);
          }}
          disabled={!enabled}
        >
          {this.props.properties.Title}
        </Button>
      </ButtonGroup>
    );
  }
}

class HeadlightButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentState: this.props.properties.states[0],
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.state !== this.props.state) {
      for (let c = 0; c < this.props.properties.states.length; c++) {
        if (this.props.properties.states[c].CCommand === this.props.state) {
          this.setState({
            currentState: this.props.properties.states[c],
          });
        }
      }
    }
  }

  onClick(e, state) {
    if (this.state.currentState === state) {
      ipcRenderer.send(
        channels.CHP_STATE_CHANGE,
        this.props.properties.states[0].SerialCommand
      );
    } else {
      ipcRenderer.send(channels.CHP_STATE_CHANGE, state.SerialCommand);
    }
  }

  render() {
    const { enabled } = this.props;

    return (
      <ButtonGroup className={this.props.className} vertical>
        <Button
          variant={
            this.props.state === this.props.properties.states[2].CCommand
              ? this.props.properties.ActiveVariant
              : 'dark'
          }
          onClick={(e) => {
            this.onClick(e, this.props.properties.states[2]);
          }}
          disabled={!enabled}
        >
          Headlights
        </Button>
        <Button
          variant={
            this.props.state === this.props.properties.states[1].CCommand ||
            this.props.state === this.props.properties.states[2].CCommand
              ? this.props.properties.ActiveVariant
              : 'dark'
          }
          onClick={(e) => {
            this.onClick(e, this.props.properties.states[1]);
          }}
          disabled={!enabled}
        >
          Parklights
        </Button>
      </ButtonGroup>
    );
  }
}

class MainController extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ButtonTitle: 'Off',
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

    this.StateChange = this.StateChange.bind(this);
  }

  componentDidMount() {
    ipcRenderer.send(channels.CHP_STATE_CHANGE, ')');
    ipcRenderer.on(channels.CHP_STATE_CHANGE, (event, arg) => {
      // ipcRenderer.removeAllListeners(channels.CHP_STATE_CHANGE);
      const { response } = arg;
      this.setState({ CHPState: response });
    });
  }

  componentWillUnmount() {
    ipcRenderer.removeAllListeners(channels.CHP_STATE_CHANGE);
  }

  onClick(event, state) {
    ipcRenderer.send(channels.CHP_STATE_CHANGE, state);
  }

  StateChange(command: string) {
    ipcRenderer.send(channels.CHP_STATE_CHANGE, command);
  }

  render() {
    const { CHPState } = this.state;
    const { vehicle } = this.props;

    return (
      <Container style={this.props.style} className={this.props.className}>
        <Row style={{ height: '25%' }}>
          <Col>
            <p className="col-form-label">Code 1</p>
            <CodeButton
              state={CHPState.EmergencyState.Code1}
              properties={CHP_States.code1}
              enabled={vehicle.enabled_functions.code1}
              StateChange={this.StateChange}
            />
          </Col>
          <Col>
            <p className="col-form-label">Code 2</p>
            <CodeButton
              state={CHPState.EmergencyState.Code2}
              properties={CHP_States.code2}
              enabled={vehicle.enabled_functions.code2}
            />
          </Col>
          <Col>
            <p className="col-form-label">Code 3</p>
            <CodeButton
              state={CHPState.EmergencyState.Code3}
              properties={CHP_States.code3}
              enabled={vehicle.enabled_functions.code3}
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
              enabled={vehicle.enabled_functions.siren}
            />
          </Col>
          <Col>
            <p className="col-form-label">Traffic Advisor</p>
            <TrafficAdvisorButton
              className="w-100 h-50"
              state={CHPState.EmergencyState.TrafficAdvisor}
              properties={CHP_States.traffic_advisor}
              enabled={vehicle.enabled_functions.traffic_advisor}
            />
          </Col>
          <Col>
            <p className="col-form-label">Horn</p>
            <HornButton
              className="w-50 h-50"
              enabled={vehicle.enabled_functions.horn}
            />
          </Col>
        </Row>
        <Row style={{ height: '25%' }}>
          <Col>
            <p className="col-form-label">Spotlights</p>
            <ButtonGroup className="w-50 mx-2 h-100" size="md">
              <SceneButton
                className="h-50"
                state={CHPState.SceneState.D_Spot_S}
                properties={CHP_States.scene.d_spot}
                activeVariant={CHP_States.scene.ActiveVariant}
                text="Left"
                enabled={vehicle.enabled_functions.left_spot}
              />
              <SceneButton
                className="h-50"
                state={CHPState.SceneState.P_Spot_S}
                properties={CHP_States.scene.p_spot}
                activeVariant={CHP_States.scene.ActiveVariant}
                text="Right"
                enabled={vehicle.enabled_functions.right_spot}
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
                enabled={vehicle.enabled_functions.scene}
              />
              <SceneButton
                className="h-50"
                state={CHPState.SceneState.Takedown_S}
                properties={CHP_States.scene.takedown}
                activeVariant={CHP_States.scene.ActiveVariant}
                text="Takedown"
                enabled={vehicle.enabled_functions.scene}
              />
              <SceneButton
                className="h-50"
                state={CHPState.SceneState.P_Alley_S}
                properties={CHP_States.scene.p_alley}
                activeVariant={CHP_States.scene.ActiveVariant}
                text="Right Alley"
                enabled={vehicle.enabled_functions.scene}
              />
            </ButtonGroup>
          </Col>
          <Col>
            <p className="col-form-label">Off</p>
            <Button
              className="mx-2 w-25 h-50"
              size="md"
              variant="dark"
              onClick={(e) => {
                this.onClick(e, ')');
              }}
              enabled={vehicle.enabled_functions.off}
            >
              Scene Off
            </Button>
            <Button
              className="mx-2 w-25 h-50"
              size="md"
              variant="dark"
              onClick={(e) => {
                this.onClick(e, '0');
              }}
              enabled={vehicle.enabled_functions.off}
            >
              L/S Off
            </Button>
            <Button
              className="mx-2 w-25 h-50"
              size="md"
              variant="dark"
              onClick={(e) => {
                this.onClick(e, ')');
              }}
              enabled={vehicle.enabled_functions.off}
            >
              Full Reset
            </Button>
          </Col>
        </Row>

        <Row style={{ height: '25%' }}>
          <Col>
            {/* <p>Gear</p> */}
            <TransmissionButton
              state={CHPState.VehicleState.Gear}
              properties={CHP_States.transmission}
              enabled={vehicle.enabled_functions.transmission}
            />
          </Col>
          <Col>
            {/* <p>Lights</p> */}
            <HeadlightButton
              className="w-100 h-50"
              state={CHPState.VehicleState.Headlights}
              properties={CHP_States.headlights}
              enabled={vehicle.enabled_functions.headlights}
            />
          </Col>
          <Col>
            {/* <p>Brights</p> */}
            <MomentaryToggleButtons
              className="w-100 h-50"
              state={CHPState.VehicleState.Brights}
              properties={CHP_States.brights}
              enabled={vehicle.enabled_functions.brights}
            />
          </Col>
          <Col>
            {/* <p>Brakes</p> */}
            <MomentaryToggleButtons
              className="w-100 h-50"
              state={CHPState.VehicleState.Brakes}
              properties={CHP_States.brakes}
              enabled={vehicle.enabled_functions.brakes}
            />
          </Col>
          <Col>
            {/* <p>Signals</p> */}
            <IndicatorButton
              state={CHPState.VehicleState.Indicator}
              properties={CHP_States.indicators}
              enabled={vehicle.enabled_functions.indicators}
            />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default MainController;
