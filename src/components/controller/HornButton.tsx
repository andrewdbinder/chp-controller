import React from 'react';
import Button from 'react-bootstrap/Button';
import horn from '../../../assets/controller-icons/horn.svg';

type HornButtonPropType = {
  enabled: boolean;
  StateChange: any;
  className: string;
};

type HornButtonStateType = {
  variant: string;
};

class HornButton extends React.Component<
  HornButtonPropType,
  HornButtonStateType
> {
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
    const { variant } = this.state;
    const { enabled, className } = this.props;

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
        <img src={horn} alt="Horn" className="filter-white" width="40%" />
      </Button>
    );
  }
}

export default HornButton;
