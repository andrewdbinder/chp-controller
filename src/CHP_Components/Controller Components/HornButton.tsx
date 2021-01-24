import React from 'react';
import Button from 'react-bootstrap/Button';

type HornButtonPropType = {
  enabled: boolean;
  StateChange: any;
  className: string;
};

type HornButtonStateType = {
  variant: string;
};

class HornButton extends React.Component< HornButtonPropType, HornButtonStateType> {
  constructor(props: HornButtonPropType) {
    super(props);
    this.state = {
      variant: 'dark',
    };
    // this.onMouseDown = this.onMouseDown.bind(this);
    // this.onMouseUp = this.onMouseUp.bind(this);
  }

  onMouseDown() {
    const { StateChange } = this.props;

    // ipcRenderer.send(channels.CHP_STATE_CHANGE, 'g');

    this.setState({ variant: 'primary' });
    StateChange('g');
  }

  onMouseUp() {
    const { StateChange } = this.props;

    // ipcRenderer.send(channels.CHP_STATE_CHANGE, 'G');
    this.setState({ variant: 'dark' });
    StateChange('G');
  }

  render() {
    const { enabled, className } = this.props;
    const { variant } = this.state;

    return (
      <Button
        className={className}
        variant={variant}
        onMouseUp={() => {
          this.onMouseUp();
        }}
        onMouseDown={() => {
          this.onMouseDown();
        }}
        disabled={!enabled}
      >
        Horn
      </Button>
    );
  }
}

export default HornButton;
