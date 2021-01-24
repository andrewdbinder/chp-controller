import React from 'react';
import Button from 'react-bootstrap/Button';

type SirenButtonPropsStateObject = {
  ProperName: string;
  ShortName: string;
  SerialCommand: string;
  CCommand: string;
};

type SirenButtonPropsObject = {
  Title: string;
  CCommand: string;
  ActiveVariant: string;
  states: SirenButtonPropsStateObject[];
};

type SirenButtonPropType = {
  properties: SirenButtonPropsObject;
  state: string;
  enabled: boolean;
  StateChange: any;
  className: string;
};

type SirenButtonStateType = {
  currentState: SirenButtonPropsStateObject;
};

class SirenButton extends React.Component<
  SirenButtonPropType,
  SirenButtonStateType
> {
  constructor(props: SirenButtonPropType) {
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

  onClick() {
    const { currentState } = this.state;
    const { properties, StateChange } = this.props;

    if (currentState.CCommand === properties.states[0].CCommand) {
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

  render() {
    const { enabled, className, state, properties } = this.props;
    const { currentState } = this.state;
    return (
      <Button
        className={className}
        variant={state === 'OFF' ? 'dark' : properties.ActiveVariant}
        onClick={() => {
          this.onClick();
        }}
        disabled={!enabled}
      >
        {currentState.ProperName}
      </Button>
    );
  }
}

export default SirenButton;
