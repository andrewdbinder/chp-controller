import React from 'react';

import Dropdown from 'react-bootstrap/Dropdown';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';

// import { channels } from '../constants';

type CodeButtonPropsStateObject = {
  ProperName: string;
  ShortName: string;
  SerialCommand: string;
  CCommand: string;
};

type CodeButtonPropsObject = {
  Title: string;
  CCommand: string;
  ActiveVariant: string;
  states: CodeButtonPropsStateObject[];
};

type CodeButtonPropType = {
  properties: CodeButtonPropsObject;
  state: string;
  enabled: boolean;
  StateChange: any;
};

type CodeButtonStateType = {
  idx: number;
  currentState: CodeButtonPropsStateObject;
};

class CodeButton extends React.Component<
  CodeButtonPropType,
  CodeButtonStateType
> {
  constructor(props: CodeButtonPropType) {
    super(props);
    const { properties } = this.props;
    this.state = {
      idx: 0,
      currentState: properties.states[0],
    };
  }

  componentDidUpdate(prevProps: CodeButtonPropType) {
    const { state } = this.props;

    if (state !== prevProps.state) {
      this.onUpdate();
    }
  }

  onUpdate() {
    const { currentState } = this.state;
    const { properties, state } = this.props;

    if (currentState.CCommand !== `${properties.CCommand}::${state}`) {
      for (let c = 0; c < properties.states.length; c += 1) {
        if (
          properties.states[c].CCommand === `${properties.CCommand}::${state}`
        ) {
          this.setState({
            currentState: properties.states[c],
            idx: c,
          });
        }
      }
    }
  }

  onClick(index: number) {
    const { properties, StateChange } = this.props;

    StateChange(properties.states[index].SerialCommand);
  }

  Increment() {
    const { idx } = this.state;
    const { properties, StateChange } = this.props;

    if (idx + 1 < properties.states.length) {
      // ipcRenderer.send(
      //   channels.CHP_STATE_CHANGE,
      //   properties.states[idx + 1].SerialCommand
      // );
      StateChange(properties.states[idx + 1].SerialCommand);
    } else {
      // ipcRenderer.send(
      //   channels.CHP_STATE_CHANGE,
      //   properties.states[0].SerialCommand
      // );
      StateChange(properties.states[0].SerialCommand);
    }
  }

  render() {
    const { enabled, state, properties } = this.props;
    const { currentState, idx } = this.state;

    return (
      <Dropdown
        className="w-100 h-50"
        as={ButtonGroup}
        size="md"
        // justified
      >
        <ButtonGroup className="w-100">
          <Button
            onClick={() => {
              this.Increment();
            }}
            variant={state === 'OFF' ? 'dark' : properties.ActiveVariant}
            disabled={!enabled}
          >
            <p className="button-text">{currentState.ProperName}</p>
          </Button>
        </ButtonGroup>

        <Dropdown.Toggle
          split
          variant={state === 'OFF' ? 'dark' : properties.ActiveVariant}
          disabled={!enabled}
        />
        <Dropdown.Menu align="right">
          {properties.states.slice(1).map((CodeState, index) => (
            <Dropdown.Item
              key={String(index)}
              active={idx === index + 1}
              onClick={() => {
                this.onClick(index + 1);
              }}
            >
              {CodeState.ProperName}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    );
  }
}

export default CodeButton;
