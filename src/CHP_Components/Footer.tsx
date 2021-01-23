import React from 'react';

import Navbar from 'react-bootstrap/Navbar';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import icon from '../../assets/icon.svg';

const { ipcRenderer } = window.require('electron');
const { channels } = require('./channels.js');

class Footer extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      appName: '',
      appVersion: '',
    };

    // this.StateChange = this.StateChange.bind(this);
  }

  componentDidMount() {
    ipcRenderer.send(channels.APP_INFO);
    ipcRenderer.once(channels.APP_INFO, (event, arg) => {
      const { appName, appVersion } = arg;
      this.setState({ appName, appVersion });
    });
  }

  render() {
    const { appName, appVersion } = this.state;
    return (
      <Navbar
        className="footer"
        fixed="bottom"
        bg="dark"
        variant="dark"
        expand="lg"
      >
        <Col className="text-left">
          <Navbar.Brand href="#home">
            <img
              alt=""
              src={icon}
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{' '}
          </Navbar.Brand>
          <Navbar.Text>
            {appName} {appVersion}
          </Navbar.Text>
        </Col>

        <Col xs={2}>
          <Navbar.Text>abinder.dev</Navbar.Text>
        </Col>

        <Col className="text-right">
          <Button variant="danger" className="ml-auto">
            Disconnected
          </Button>
        </Col>
      </Navbar>
    );
  }
}

export default Footer;
