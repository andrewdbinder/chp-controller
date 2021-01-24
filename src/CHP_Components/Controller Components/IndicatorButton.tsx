import React from 'react';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';

type IndicatorButtonPropsStateObject = {
  ProperName: string;
  ShortName: string;
  SerialCommand: string;
  CCommand: string;
};

type IndicatorButtonPropsObject = {
  Title: string;
  // CCommand: string;
  ActiveVariant: string;
  states: IndicatorButtonPropsStateObject[];
};

type IndicatorButtonPropType = {
  properties: IndicatorButtonPropsObject;
  state: string;
  enabled: boolean;
  StateChange: any;
};

type IndicatorButtonStateType = {
  currentState: IndicatorButtonPropsStateObject;
};

class IndicatorButton extends React.Component<
  IndicatorButtonPropType,
  IndicatorButtonStateType
> {
  constructor(props: IndicatorButtonPropType) {
    super(props);
    const { properties } = this.props;
    this.state = {
      currentState: properties.states[0],
    };
  }

  componentDidUpdate(prevProps: IndicatorButtonPropType) {
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

  onClick(stateReq: IndicatorButtonPropsStateObject) {
    const { currentState } = this.state;
    const { properties, StateChange } = this.props;

    if (currentState === stateReq) {
      // ipcRenderer.send(
      //   channels.CHP_STATE_CHANGE,
      //   this.props.properties.states[0].SerialCommand
      // );
      StateChange(properties.states[0].SerialCommand);
    } else {
      // ipcRenderer.send(channels.CHP_STATE_CHANGE, stateReq.SerialCommand);
      StateChange(stateReq.SerialCommand);
    }
  }

  render() {
    const { enabled, properties, state } = this.props;

    return (
      <ButtonGroup className="w-100 h-50">
        {properties.states.slice(1).map((Indicator, index) => (
          <Button
            key={String(index)}
            variant={
              state === Indicator.CCommand ? properties.ActiveVariant : 'dark'
            }
            onClick={() => {
              this.onClick(Indicator);
            }}
            disabled={!enabled}
          >
            {Indicator.ProperName}
          </Button>
        ))}
      </ButtonGroup>
    );
  }
}

export default IndicatorButton;
