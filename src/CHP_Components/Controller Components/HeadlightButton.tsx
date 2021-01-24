import React from 'react';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';

type HeadlightButtonPropsStateObject = {
  ProperName: string;
  ShortName: string;
  SerialCommand: string;
  CCommand: string;
};

type HeadlightButtonPropsObject = {
  Title: string;
  // CCommand: string;
  ActiveVariant: string;
  states: HeadlightButtonPropsStateObject[];
};

type HeadlightButtonPropType = {
  properties: HeadlightButtonPropsObject;
  state: string;
  enabled: boolean;
  className: string;
  // activeVariant: string;
  // text: string;
  StateChange: any;
};

type HeadlightButtonStateType = {
  currentState: HeadlightButtonPropsStateObject;
};

class HeadlightButton extends React.Component<
  HeadlightButtonPropType,
  HeadlightButtonStateType
> {
  constructor(props: HeadlightButtonPropType) {
    super(props);
    const { properties } = this.props;
    this.state = {
      currentState: properties.states[0],
    };
  }

  componentDidUpdate(prevProps: HeadlightButtonPropType) {
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

  onClick(state: HeadlightButtonPropsStateObject) {
    const { currentState } = this.state;
    const { properties, StateChange } = this.props;

    if (currentState === state) {
      StateChange(properties.states[0].SerialCommand);
    } else {
      StateChange(state.SerialCommand);
    }
  }

  render() {
    const { enabled, className, properties, state } = this.props;

    return (
      <ButtonGroup className={className} vertical>
        <Button
          variant={
            state === properties.states[2].CCommand
              ? properties.ActiveVariant
              : 'dark'
          }
          onClick={() => {
            this.onClick(properties.states[2]);
          }}
          disabled={!enabled}
        >
          Headlights
        </Button>
        <Button
          variant={
            state === properties.states[1].CCommand ||
            state === properties.states[2].CCommand
              ? properties.ActiveVariant
              : 'dark'
          }
          onClick={() => {
            this.onClick(properties.states[1]);
          }}
          disabled={!enabled}
        >
          Parklights
        </Button>
      </ButtonGroup>
    );
  }
}

export default HeadlightButton;
