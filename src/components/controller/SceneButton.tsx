import React from 'react';
import Button from 'react-bootstrap/Button';

type SceneButtonPropsStateObject = {
  ProperName: string;
  ShortName: string;
  SerialCommand: string;
  CCommand: boolean;
};

type SceneButtonPropsObject = {
  // Title: string;
  // CCommand: string;
  // ActiveVariant: string;
  states: SceneButtonPropsStateObject[];
};

type SceneButtonPropType = {
  properties: SceneButtonPropsObject;
  state: boolean;
  enabled: boolean;
  className: string;
  activeVariant: string;
  text: string;
  StateChange: any;
};

type SceneButtonStateType = {
  currentState: SceneButtonPropsStateObject;
};

class SceneButton extends React.Component<
  SceneButtonPropType,
  SceneButtonStateType
> {
  constructor(props: SceneButtonPropType) {
    super(props);
    const { properties } = this.props;
    this.state = {
      currentState: properties.states[0],
    };
  }

  componentDidUpdate(prevProps: SceneButtonPropType) {
    const { properties, state } = this.props;

    if (prevProps.state !== state) {
      for (let c = 0; c < properties.states.length; c += 1) {
        if (properties.states[c].CCommand === state) {
          // TODO: Fix this
          // eslint-disable-next-line react/no-did-update-set-state
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

  render() {
    const {
      properties,
      state,
      enabled,
      className,
      activeVariant,
      text,
    } = this.props;

    return (
      <Button
        className={className}
        variant={
          state === properties.states[0].CCommand ? 'dark' : activeVariant
        }
        onClick={() => {
          this.onClick();
        }}
        disabled={!enabled}
      >
        {text}
      </Button>
    );
  }
}

export default SceneButton;
