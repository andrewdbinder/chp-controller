// eslint-disable-next-line max-classes-per-file
import React from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';

import Card from 'react-bootstrap/Card';

import { HashRouter, Route, Switch, Link } from 'react-router-dom';

import tahoe from '../../assets/vehicles/Chevy_Tahoe_2015_LB_Front.png';
import charger from '../../assets/vehicles/Dodge_Charger_2015_LB_Front.png';
import chargerpcf from '../../assets/vehicles/Dodge_Charger_2019_PCF_Front.png';
import crownvic from '../../assets/vehicles/Ford_CrownVic_2011_LB_Front.png';

function TahoeCard() {
  return (
    <Card style={{ width: '30%', fontSize: '12pt' }} bg="dark">
      <Card.Header as="h5">Chevy Tahoe</Card.Header>
      <Card.Img variant="top" src={tahoe} />
      <Card.Body style={{ textAlign: 'left' }}>
        <Button variant="primary" block>
          Select
        </Button>
      </Card.Body>
    </Card>
  );
}

function ChargerCard() {
  return (
    <Card style={{ width: '30%', fontSize: '12pt' }} bg="dark">
      <Card.Header as="h5">Dodge Charger</Card.Header>
      <Card.Img variant="top" src={charger} />
      <Card.Body style={{ textAlign: 'left' }}>
        <Button variant="primary" block>
          Select
        </Button>
      </Card.Body>
    </Card>
  );
}

function ChargerPCFCard() {
  return (
    <Card style={{ width: '30%', fontSize: '12pt' }} bg="dark">
      <Card.Header as="h5">Dodge Charger PCF</Card.Header>
      <Card.Img variant="top" src={chargerpcf} />
      <Card.Body style={{ textAlign: 'left' }}>
        <Button variant="primary" block>
          Select
        </Button>
      </Card.Body>
    </Card>
  );
}

function CrownVicCard() {
  return (
    <Card style={{ width: '30%', fontSize: '12pt' }} bg="dark">
      <Card.Header as="h5">Crown Victoria</Card.Header>
      <Card.Img variant="top" src={crownvic} />
      <Card.Body style={{ textAlign: 'left' }}>
        <Button variant="primary" block>
          Select
        </Button>
      </Card.Body>
    </Card>
  );
}

function VehiclePicker() {
  return (
    <Container style={{ overflow: 'auto' }}>
      <h2>Vehicles</h2>
      <Container style={{ display: 'flex', justifyContent: 'space-between' }}>
        <TahoeCard />
        <ChargerCard />
        <CrownVicCard />
      </Container>
      <Container
        className="mt-4"
        style={{ display: 'flex', justifyContent: 'space-between' }}
      >
        <ChargerPCFCard />
        <ChargerCard />
        <CrownVicCard />
      </Container>
    </Container>
  );
}

function HelloWorld() {
  return (
    <Container>
      <p>Hello, world!</p>
    </Container>
  );
}

// eslint-disable-next-line react/prefer-stateless-function,@typescript-eslint/no-explicit-any
class Connection extends React.Component<any, any> {
  render() {
    const ports = ['COM10', 'COM12'];

    return (
      <Container style={{ textAlign: 'left' }}>
        <h4>Connection</h4>
        <p style={{ fontSize: 'calc(16px)' }}>
          Auto Connect will attempt to automatically find and connect to a
          display. If this fails, the device can be set manually by disabling
          Auto Connect.
        </p>
        <Col>
          <Row>
            <Button className="mr-2" variant="secondary">
              Scan Devices
            </Button>
            <Dropdown>
              <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                NONE
              </Dropdown.Toggle>

              <Dropdown.Menu>
                {ports.length > 0 &&
                  // eslint-disable-next-line react/jsx-key
                  ports.map((port) => <Dropdown.Item>{port}</Dropdown.Item>)}
              </Dropdown.Menu>
            </Dropdown>
            <Button className="ml-2" variant="primary" disabled>
              Connect
            </Button>
            <Button disabled className="ml-2">
              Set as Default
            </Button>
            <hr />
          </Row>
        </Col>
      </Container>
    );
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
class Settings extends React.Component<any, any> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(props: any) {
    super(props);
    this.state = {};
  }

  /*
  componentDidMount(): void {
    const { location } = this.props;
    console.log(location.pathname);
  }
  */

  render() {
    const { location } = this.props;
    return (
      <Container
        fluid
        // className="height"
      >
        {/* <h2>Settings</h2> */}
        {/* <Tab.Container defaultActiveKey="first"> */}
        <Row>
          <Col sm={3} style={{ backgroundColor: '#343a40' }}>
            <Nav
              activeKey={location.pathname}
              variant="pills"
              className="flex-column height"
              style={{
                paddingLeft: '8vw',
                paddingTop: '5vh',
              }}
            >
              <Nav.Item>
                <Nav.Link
                  eventKey="/settings/general"
                  as={Link}
                  to="/settings/general"
                >
                  General
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  eventKey="/settings/connection"
                  as={Link}
                  to="/settings/connection"
                >
                  Connection
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  eventKey="/settings/vehicle"
                  as={Link}
                  to="/settings/vehicle"
                >
                  Vehicle
                </Nav.Link>
              </Nav.Item>

              <Nav.Item className="mt-auto mb-2">
                <Button block as={Link} to="/" variant="success">
                  Return
                </Button>
              </Nav.Item>
            </Nav>
          </Col>
          <Col sm={9} className="height">
            {/*  <Tab.Content style={{'padding-top': '6vh', 'padding-right': '10vw'}} > */}
            {/*    <Tab.Pane eventKey="first"> */}
            {/*      <Connection /> */}
            {/*    </Tab.Pane> */}
            {/*    <Tab.Pane eventKey="second"> */}
            {/*      <p> second </p> */}
            {/*    </Tab.Pane> */}
            {/*    <Tab.Pane eventKey="general"> */}
            {/*      <p> second </p> */}
            {/*    </Tab.Pane> */}
            {/*  </Tab.Content> */}
            <HashRouter>
              <Switch>
                <Route exact path="/settings/general" component={HelloWorld} />
                <Route
                  exact
                  path="/settings/connection"
                  component={Connection}
                />
                <Route
                  exact
                  path="/settings/vehicle"
                  component={VehiclePicker}
                />
              </Switch>
            </HashRouter>
          </Col>
        </Row>
        {/* </Tab.Container> */}
      </Container>
    );
  }
}

export default Settings;
