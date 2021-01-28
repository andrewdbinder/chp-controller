import React from 'react';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';

import Split from '../../../assets/controller-icons/arrow-split.svg';
import Left from '../../../assets/controller-icons/arrow-left.svg';
import Right from '../../../assets/controller-icons/arrow-right.svg';

type TrafficAdvisorButtonPropsStateObject = {
  ProperName: string;
  ShortName: string;
  SerialCommand: string;
  CCommand: string;
};

type TrafficAdvisorButtonPropsObject = {
  Title: string;
  CCommand: string;
  ActiveVariant: string;
  states: TrafficAdvisorButtonPropsStateObject[];
};

type TrafficAdvisorButtonPropType = {
  properties: TrafficAdvisorButtonPropsObject;
  state: string;
  enabled: boolean;
  StateChange: any;
  className: string;
};

type TrafficAdvisorButtonStateType = {
  currentState: TrafficAdvisorButtonPropsStateObject;
};

class TrafficAdvisorButton extends React.Component<
  TrafficAdvisorButtonPropType,
  TrafficAdvisorButtonStateType
> {
  static GetImage(text: string) {
    switch (text) {
      case 'Split':
        return Split;
      case 'Left':
        return Left;
      case 'Right':
        return Right;
      default:
        return null;
    }
  }

  constructor(props: TrafficAdvisorButtonPropType) {
    super(props);
    const { properties } = this.props;
    this.state = {
      currentState: properties.states[0],
    };
  }

  componentDidUpdate(prevProps: TrafficAdvisorButtonPropType) {
    const { state } = this.props;

    if (state !== prevProps.state) {
      this.onUpdate();
    }
  }

  onUpdate() {
    const { currentState } = this.state;
    const { properties, state } = this.props;

    if (
      `${properties.CCommand}::${currentState.CCommand}` !==
      `${properties.CCommand}::${state}`
    ) {
      for (let c = 0; c < properties.states.length; c += 1) {
        if (
          `${properties.CCommand}::${properties.states[c].CCommand}` ===
          `${properties.CCommand}::${state}`
        ) {
          this.setState({
            currentState: properties.states[c],
          });
        }
      }
    }
  }

  onClick(reqState: TrafficAdvisorButtonPropsStateObject) {
    const { properties, StateChange } = this.props;
    const { currentState } = this.state;

    if (currentState === reqState) {
      StateChange(properties.states[0].SerialCommand);
    } else {
      StateChange(reqState.SerialCommand);
    }
  }

  render() {
    const { enabled, state, properties, className } = this.props;

    return (
      <ButtonGroup className={className}>
        {properties.states.slice(1).map((TAState, index) => (
          <Button
            variant={
              state === TAState.CCommand ? properties.ActiveVariant : 'dark'
            }
            key={String(index)}
            onClick={() => {
              this.onClick(TAState);
            }}
            disabled={!enabled}
          >
            <img
              src={TrafficAdvisorButton.GetImage(TAState.ProperName)}
              alt={TAState.ProperName}
              className={state === TAState.CCommand ? '' : 'filter-white'}
              height="40%"
            />
          </Button>
        ))}
      </ButtonGroup>
    );
  }
}

export default TrafficAdvisorButton;
