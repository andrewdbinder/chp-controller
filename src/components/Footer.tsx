import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import icon from '../../assets/icon.svg';

const { ipcRenderer } = window.require('electron');
const { channels } = require('./channels.js');

type FooterState = {
  appVersion: string;
  comPort: string;
  comStatus: boolean;
};

class Footer extends React.Component<any, FooterState> {
  constructor(props: any) {
    super(props);
    this.state = {
      appVersion: '',
      comPort: '',
      comStatus: false,
    };

    // this.StateChange = this.StateChange.bind(this);
  }

  componentDidMount() {
    ipcRenderer.send(channels.APP_INFO);
    ipcRenderer.once(channels.APP_INFO, (_event: any, arg: FooterState) => {
      const { appVersion } = arg;
      this.setState({ appVersion });
    });

    ipcRenderer.send(channels.COM_STATUS);
    ipcRenderer.on(channels.COM_STATUS, (_event: any, arg: FooterState) => {
      const { comPort, comStatus } = arg;
      this.setState({ comPort, comStatus });
      console.log(arg);
    });
  }

  componentDidUpdate(
    _prevProps: Readonly<any>,
    prevState: Readonly<FooterState>,
    _snapshot?: any
  ): void {
    const { comStatus } = this.state;

    if (prevState.comStatus !== comStatus) {
      console.log(`comStatus update`);
    }
  }

  componentWillUnmount(): void {
    ipcRenderer.removeAllListeners(channels.COM_STATUS);
  }

  render() {
    const { appVersion, comStatus, comPort } = this.state;
    return (
      <Navbar
        className="footer"
        fixed="bottom"
        bg="dark"
        variant="dark"
        expand="lg"
      >
        <Col className="text-left" style={{ paddingLeft: 0, paddingRight: 0 }}>
          <Navbar.Brand href="#home">
            <img
              alt=""
              src={icon}
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{' '}
          </Navbar.Brand>
          <Navbar.Text className="d-inline-block align-top">
            {/* {appName} v{appVersion} */}
            {appVersion}
          </Navbar.Text>
        </Col>

        <Col xs={2}>
          <Navbar.Text>abinder.dev</Navbar.Text>
        </Col>

        <Col className="text-right" style={{ paddingLeft: 0, paddingRight: 0 }}>
          <Button
            as={Link}
            // TODO: Fix this link, it determines to location on component load,'
            //  not when pressed
            // to={
            //   window.location.href.includes('/settings')
            //     ? '/'
            //     : '/settings/connection'
            // }
            to="/settings/connection"
            className="ml-auto"
            variant={comStatus ? 'success' : 'danger'}
            onClick={() => {
              console.log(window.location);
            }}
          >
            {comStatus ? `${comPort} Connected` : 'Disconnected'}
          </Button>
        </Col>
      </Navbar>
    );
  }
}

export default Footer;
