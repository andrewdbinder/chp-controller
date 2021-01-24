import React from 'react';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';

type MomentaryButtonPropsStateObject = {
  ProperName: string;
  ShortName: string;
  SerialCommand: string;
  CCommand: boolean;
};

type MomentaryButtonPropsObject = {
  Title: string;
  // CCommand: string;
  // ActiveVariant: string;
  states: MomentaryButtonPropsStateObject[];
};

type MomentaryButtonPropType = {
  properties: MomentaryButtonPropsObject;
  state: boolean;
  enabled: boolean;
  className: string;
  activeVariant: string;
  // text: string;
  StateChange: any;
};

type MomentaryButtonStateType = {
  currentState: MomentaryButtonPropsStateObject;
};

class MomentaryToggleButtons extends React.Component<
  MomentaryButtonPropType,
  MomentaryButtonStateType
> {
  constructor(props: MomentaryButtonPropType) {
    super(props);
    const { properties } = this.props;
    this.state = {
      currentState: properties.states[0],
    };
  }

  componentDidUpdate(prevProps: MomentaryButtonPropType) {
    const { state, properties } = this.props;
    if (prevProps.state !== state) {
      for (let c = 0; c < properties.states.length; c += 1) {
        if (properties.states[c].CCommand === state) {
          this.setState({
            currentState: properties.states[c],
          });
        }
      }
    }
  }

  onClick() {
    const { properties, StateChange } = this.props;
    const { currentState } = this.state;

    if (currentState === properties.states[0]) {
      // ipcRenderer.send(
      //   channels.CHP_STATE_CHANGE,
      //   this.props.properties.states[1].SerialCommand
      // );
      StateChange(properties.states[1].SerialCommand);
    } else {
      // ipcRenderer.send(
      //   channels.CHP_STATE_CHANGE,
      //   this.props.properties.states[0].SerialCommand
      // );
      StateChange(properties.states[0].SerialCommand);
    }
  }

  onMouseDown() {
    const { properties, StateChange } = this.props;

    // ipcRenderer.send(
    //   channels.CHP_STATE_CHANGE,
    //   this.props.properties.states[1].SerialCommand
    // );
    StateChange(properties.states[1].SerialCommand);
  }

  onMouseUp() {
    const { properties, StateChange } = this.props;
    // ipcRenderer.send(
    //   channels.CHP_STATE_CHANGE,
    //   this.props.properties.states[0].SerialCommand
    // );
    StateChange(properties.states[0].SerialCommand);
  }

  render() {
    const { state, enabled, className, properties, activeVariant } = this.props;

    return (
      <Button
        className={className}
        variant={
          state === properties.states[0].CCommand ? 'dark' : activeVariant
        }
        onClick={() => {
          this.onClick();
        }}
        onMouseDown={() => {
          this.onMouseDown();
        }}
        onMouseUp={() => {
          this.onMouseUp();
        }}
        disabled={!enabled}
      >
        {properties.Title}
      </Button>
    );
  }
}

export default MomentaryToggleButtons;
