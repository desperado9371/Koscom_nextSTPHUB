import React from 'react';
import { Row, Col, Button, ProgressBar, Card, Table } from 'react-bootstrap';
import Mini_Table from '../Components/Tables/Mini_Table';
import MixChart from '../Components/MixChart';
import SearchForm from '../Components/SearchForm';
import Table_example from '../Components/Table_example';
import Timer from '../Components/Timer';
import dgram from 'dgram';

const Monitoring = () => {
  return (
    <div className="monit">
      <Row style={{ backgroundColor: '#444444' }}>
        <Col className="align-self-center" sm={1}>
          <Button
            className="bk_btn"
            variant="secondary"
            style={{ fontSize: '40px' }}
            href="#/Home"
          >
            {'<'}
          </Button>
        </Col>
        <Col className="monit_title align-self-center text-left" sm={7}>
          nextSTPHUB
        </Col>
        <Col className="align-self-center center-block text-right" sm={4}>
          <Timer />
        </Col>
      </Row>
      <Row>
        <Button>
          UDP sendtest
        </Button>
      </Row>

      <Row
        className=" mt-3 ml-3"
        style={{ fontSize: '1.5vw', fontWeight: 'bolder' }}
      >
        세션모니터링
      </Row>

      <Row
        className=" mx-5 mt-1"
        style={{ fontSize: '1.2vw', fontWeight: 'bolder' }}
      >
        <Col sm={2}>
          <Table
          bordered
          responsive="md"
          size="md"
          variant="dark"
          style={{ fontSize: '0.8vw', width: '100%' }}>
            <thead>
              <tr>
                <th>CompID</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ backgroundColor: 'green' }}>
                <td>KRITEST</td>
                <td>1</td>
              </tr>
              <tr style={{ backgroundColor: 'green' }}>
                <td>KRSTEST</td>
                <td>1</td>
              </tr>
              <tr style={{ backgroundColor: 'red' }}>
                <td>KRINONE</td>
                <td>0</td>
              </tr>
              <tr>
                <td>- </td>
                <td> </td>
              </tr>
              <tr>
                <td>- </td>
                <td> </td>
              </tr>
            </tbody>
          </Table>
        </Col>
        <Col sm={2}>
          <Table>
            <thead>
              <tr>
                <th>CompID</th>
                <th>Status</th>
              </tr>
            </thead>
          </Table>
        </Col>
        <Col sm={2}>
          <Table>
            <thead>
              <tr>
                <th>CompID</th>
                <th>Status</th>
              </tr>
            </thead>
          </Table>
        </Col>
        <Col sm={2}>
          <Table>
            <thead>
              <tr>
                <th>CompID</th>
                <th>Status</th>
              </tr>
            </thead>
          </Table>
        </Col>
        <Col sm={2}>
          <Table>
            <thead>
              <tr>
                <th>CompID</th>
                <th>Status</th>
              </tr>
            </thead>
          </Table>
        </Col>
        <Col sm={2}>
          <Table>
            <thead>
              <tr>
                <th>CompID</th>
                <th>Status</th>
              </tr>
            </thead>
          </Table>
        </Col>
      </Row>


    </div>
  );
};

export default Monitoring;
