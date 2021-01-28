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
    const { state } = this.props;

    if (prevProps.state !== state) {
      this.updateState();
    }
  }

  onClick() {
    const { currentState } = this.state;
    const { properties, StateChange } = this.props;

    if (currentState === properties.states[0]) {
      StateChange(properties.states[1].SerialCommand);
    } else {
      StateChange(properties.states[0].SerialCommand);
    }
  }

  updateState() {
    const { properties, state } = this.props;

    for (let c = 0; c < properties.states.length; c += 1) {
      if (properties.states[c].CCommand === state) {
        this.setState({
          currentState: properties.states[c],
        });
      }
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
