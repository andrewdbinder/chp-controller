import React from 'react';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';

type TransmissionButtonPropsStateObject = {
  ProperName: string;
  ShortName: string;
  SerialCommand: string;
  CCommand: string;
};

type TransmissionButtonPropsObject = {
  Title: string;
  // CCommand: string;
  ActiveVariant: string;
  states: TransmissionButtonPropsStateObject[];
};

type TransmissionButtonPropType = {
  properties: TransmissionButtonPropsObject;
  state: string;
  enabled: boolean;
  className: string;
  // activeVariant: string;
  // text: string;
  StateChange: any;
};

type TransmissionButtonStateType = {
  currentState: TransmissionButtonPropsStateObject;
};

class TransmissionButton extends React.Component<
  TransmissionButtonPropType,
  TransmissionButtonStateType
> {
  constructor(props: TransmissionButtonPropType) {
    super(props);
    // const { properties } = this.props;
    this.state = {
      // currentState: properties.states[0],
    };
  }

  /*
  componentDidUpdate(prevProps: TransmissionButtonPropType) {
    const { state, properties } = this.props;

    if (prevProps.state !== state) {
      for (let c = 0; c < properties.states.length; c += 1) {
        if (properties.states[c].CCommand === state) {
          // TODO: Fix this
          // eslint-disable-next-line react/no-did-update-set-state
          this.setState({
            currentState: this.props.properties.states[c],
          });
        }
      }
    }
  }
 */

  onClick(stateReq: TransmissionButtonPropsStateObject) {
    const { StateChange } = this.props;
    // ipcRenderer.send(channels.CHP_STATE_CHANGE, stateReq.SerialCommand);
    StateChange(stateReq.SerialCommand);
  }

  render() {
    const { enabled, properties, state, className } = this.props;

    return (
      <ButtonGroup className={className}>
        {properties.states.map((gear, index) => (
          <Button
            key={String(index)}
            variant={
              state === gear.CCommand ? properties.ActiveVariant : 'dark'
            }
            onClick={() => {
              this.onClick(gear);
            }}
            disabled={!enabled}
          >
            {gear.ProperName}
          </Button>
        ))}
      </ButtonGroup>
    );
  }
}

export default TransmissionButton;
