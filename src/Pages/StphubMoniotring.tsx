import React, { useState, useEffect } from 'react';
import { Row, Col, Button, ProgressBar, Card, Table } from 'react-bootstrap';
import dgram from 'dgram';
import Mini_Table from '../Components/Tables/Mini_Table';
import MixChart from '../Components/MixChart';
import SearchForm from '../Components/SearchForm';
import Table_example from '../Components/Table_example';
import Timer from '../Components/Timer';
import iconv from 'iconv-lite';
import { SingleEntryPlugin } from 'webpack';

const Monitoring = () => {
  const empty_object = { CompID: '-', Status: '-', Side: '-', Port: '-' };
  const dummy_list = [];
  for (let i = 0; i < 15; i++) {
    dummy_list.push(empty_object);
  }
  const [compid_list, setCompid_list] = useState(dummy_list);
  const [originMsg, setOriginMsg] = useState('');
  const [rawMsg, setRawMsg] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  console.log(compid_list);
  let compid_cnt;

  const s = dgram.createSocket({ type: 'udp4', reuseAddr: true });

  function sendData() {
    const message = new Buffer('STATUS');
    console.log('sending TEST');
    s.send(message, 0, message.length);
    setIsConnected(true);
  }

  useEffect(() => {
    s.connect(9000, '192.168.250.51', (error) =>{
      console.log('connect fail');
    });

    // const interval = setInterval(() => {
    //   sendData();
    // }, 5000);

    // return () => clearInterval(interval);


  }, []);

  s.on('message', function (message, rinfo) {
    const str_message = message.toString();
    setRawMsg(str_message);
    let json_message;
    try {
      json_message = JSON.parse(str_message);
    } catch (err) {
      console.log(err);
      setErrMsg(err.toString());
      let utf_message = iconv.decode(str_message, 'euc-kr');
      json_message = JSON.parse(utf_message);
    }
    try {
      if (json_message.TR === 'TR_ONE') {
        compid_cnt = json_message.CompIdCnt;
        console.log('TR_ONE');
        for (let i = 0; i < compid_cnt; i++) {
          dummy_list[i] = json_message.CompIdList[i];
        }
        setCompid_list(dummy_list);
      } else if (json_message.TR === 'TR_TWO') {
        console.log('TR_TWO');
        for (let i = 0; i < compid_cnt; i++) {
          console.log('comparing');
          console.log(dummy_list[i].CompID);
          console.log(json_message.SingleStatus.CompID);
          if (dummy_list[i].CompID === json_message.SingleStatus.CompID) {
            dummy_list[i].Status = json_message.SingleStatus.Status;
          }
          setCompid_list(dummy_list);
        }
      }
    } catch (err) {
      console.log(err);
      setErrMsg(err.toString());
    }

    setOriginMsg(str_message);
    console.log(originMsg);
  });
  s.on('error', (err) => {
    console.log(err);
  });

  function setColor(Status) {
    switch (Status) {
      case 0: {
        return '#E74C3C';
      }
      case 1: {
        return '#27AE60';
      }
      default: {
        return 'grey';
      }
    }
  }

  function setSideColor(Side) {
    switch (Side.toUpperCase()) {
      case 'B': {
        return '#E67E22';
      }
      case 'S': {
        return '#A569BD';
      }
      default: {
        return 'grey';
      }
    }
  }

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
      {/* <Row>
        <Button>
          UDP sendtest
        </Button>
      </Row> */}

      <Row
        className=" mt-3 ml-3"
        style={{ fontSize: '1.5vw', fontWeight: 'bolder' }}
      >
        세션모니터링
        <Button onClick={sendData} disabled={isConnected}>연결</Button>
      </Row>

      <Row
        className=" mx-5 mt-1"
        style={{ fontSize: '1.2vw', fontWeight: 'bolder' }}
      >
        <Col sm={3}>
          <Table
            bordered
            responsive="md"
            size="md"
            variant="dark"
            style={{ fontSize: '0.8vw', width: '100%', color: 'white' }}
          >
            <thead>
              <tr>
                <th>Side</th>
                <th>CompID</th>
                <th>Status</th>
                <th>Port</th>
              </tr>
            </thead>
            <tbody>
              <tr
                style={{
                  backgroundColor: setColor(compid_list[0].Status),
                }}
              >
                <th
                  style={{
                    backgroundColor: setSideColor(compid_list[0].Side),
                    color: 'white',
                  }}
                >
                  {compid_list[0].Side}
                </th>
                <th style={{ color: 'white' }}>{compid_list[0].CompID}</th>
                <th style={{ color: 'white' }}>{compid_list[0].Status}</th>
                <th style={{ color: 'white' }}>{compid_list[0].Port}</th>
              </tr>
              <tr
                style={{
                  backgroundColor: setColor(compid_list[1].Status),
                }}
              >
                <th style={{
                    backgroundColor: setSideColor(compid_list[1].Side), color: 'white' }}>{compid_list[1].Side}</th>
                <th style={{ color: 'white' }}>{compid_list[1].CompID}</th>
                <th style={{ color: 'white' }}>{compid_list[1].Status}</th>
                <th style={{ color: 'white' }}>{compid_list[1].Port}</th>
              </tr>
              <tr
                style={{
                  backgroundColor: setColor(compid_list[2].Status),
                }}
              >
                <th style={{
                    backgroundColor: setSideColor(compid_list[2].Side), color: 'white' }}>{compid_list[2].Side}</th>
                <th style={{ color: 'white' }}>{compid_list[2].CompID}</th>
                <th style={{ color: 'white' }}>{compid_list[2].Status}</th>
                <th style={{ color: 'white' }}>{compid_list[2].Port}</th>
              </tr>
              <tr
                style={{
                  backgroundColor: setColor(compid_list[3].Status),
                }}
              >
                <th style={{
                    backgroundColor: setSideColor(compid_list[3].Side),  color: 'white' }}>{compid_list[3].Side}</th>
                <th style={{ color: 'white' }}>{compid_list[3].CompID}</th>
                <th style={{ color: 'white' }}>{compid_list[3].Status}</th>
                <th style={{ color: 'white' }}>{compid_list[3].Port}</th>
              </tr>
              <tr
                style={{
                  backgroundColor: setColor(compid_list[4].Status),
                }}
              >
                <th style={{
                    backgroundColor: setSideColor(compid_list[4].Side), color: 'white' }}>{compid_list[4].Side}</th>
                <th style={{ color: 'white' }}>{compid_list[4].CompID}</th>
                <th style={{ color: 'white' }}>{compid_list[4].Status}</th>
                <th style={{ color: 'white' }}>{compid_list[4].Port}</th>
              </tr>
              <tr
                style={{
                  backgroundColor: setColor(compid_list[5].Status),
                }}
              >
                <th style={{
                    backgroundColor: setSideColor(compid_list[5].Side), color: 'white' }}>{compid_list[5].Side}</th>
                <th style={{ color: 'white' }}>{compid_list[5].CompID}</th>
                <th style={{ color: 'white' }}>{compid_list[5].Status}</th>
                <th style={{ color: 'white' }}>{compid_list[5].Port}</th>
              </tr>
              <tr
                style={{
                  backgroundColor: setColor(compid_list[6].Status),
                }}
              >
                <th style={{
                    backgroundColor: setSideColor(compid_list[6].Side), color: 'white' }}>{compid_list[6].Side}</th>
                <th style={{ color: 'white' }}>{compid_list[6].CompID}</th>
                <th style={{ color: 'white' }}>{compid_list[6].Status}</th>
                <th style={{ color: 'white' }}>{compid_list[6].Port}</th>
              </tr>
              <tr
                style={{
                  backgroundColor: setColor(compid_list[7]?.Status),
                }}
              >
                <th style={{
                    backgroundColor: setSideColor(compid_list[7].Side),color: 'white' }}>{compid_list[7].Side}</th>
                <th style={{ color: 'white' }}>{compid_list[7]?.CompID}</th>
                <th style={{ color: 'white' }}>{compid_list[7]?.Status}</th>
                <th style={{ color: 'white' }}>{compid_list[7].Port}</th>
              </tr>
              <tr
                style={{
                  backgroundColor: setColor(compid_list[8].Status),
                }}
              >
                <th style={{
                    backgroundColor: setSideColor(compid_list[8].Side),color: 'white' }}>{compid_list[8].Side}</th>
                <th style={{ color: 'white' }}>{compid_list[8].CompID}</th>
                <th style={{ color: 'white' }}>{compid_list[8].Status}</th>
                <th style={{ color: 'white' }}>{compid_list[8].Port}</th>
              </tr>
              <tr
                style={{
                  backgroundColor: setColor(compid_list[9].Status),
                }}
              >
                <th style={{
                    backgroundColor: setSideColor(compid_list[9].Side),color: 'white' }}>{compid_list[9].Side}</th>
                <th style={{ color: 'white' }}>{compid_list[9].CompID}</th>
                <th style={{ color: 'white' }}>{compid_list[9].Status}</th>
                <th style={{ color: 'white' }}>{compid_list[9].Port}</th>
              </tr>
              <tr
                style={{
                  backgroundColor: setColor(compid_list[10].Status),
                }}
              >
                <th style={{
                    backgroundColor: setSideColor(compid_list[10].Side),color: 'white' }}>{compid_list[10].Side}</th>
                <th style={{ color: 'white' }}>{compid_list[10].CompID}</th>
                <th style={{ color: 'white' }}>{compid_list[10].Status}</th>
                <th style={{ color: 'white' }}>{compid_list[10].Port}</th>
              </tr>
              <tr
                style={{
                  backgroundColor: setColor(compid_list[11].Status),
                }}
              >
                <th style={{
                    backgroundColor: setSideColor(compid_list[11].Side),color: 'white' }}>{compid_list[11].Side}</th>
                <th style={{ color: 'white' }}>{compid_list[11].CompID}</th>
                <th style={{ color: 'white' }}>{compid_list[11].Status}</th>
                <th style={{ color: 'white' }}>{compid_list[11].Port}</th>
              </tr>
              <tr
                style={{
                  backgroundColor: setColor(compid_list[12].Status),
                }}
              >
                <th style={{
                    backgroundColor: setSideColor(compid_list[12].Side),color: 'white' }}>{compid_list[12].Side}</th>
                <th style={{ color: 'white' }}>{compid_list[12].CompID}</th>
                <th style={{ color: 'white' }}>{compid_list[12].Status}</th>
                <th style={{ color: 'white' }}>{compid_list[12].Port}</th>
              </tr>
              <tr
                style={{
                  backgroundColor: setColor(compid_list[13].Status),
                }}
              >
                <th style={{
                    backgroundColor: setSideColor(compid_list[13].Side),color: 'white' }}>{compid_list[13].Side}</th>
                <th style={{ color: 'white' }}>{compid_list[13].CompID}</th>
                <th style={{ color: 'white' }}>{compid_list[13].Status}</th>
                <th style={{ color: 'white' }}>{compid_list[13].Port}</th>
              </tr>
              <tr
                style={{
                  backgroundColor: setColor(compid_list[14].Status),
                }}
              >
                <th style={{
                    backgroundColor: setSideColor(compid_list[14].Side),color: 'white' }}>{compid_list[14].Side}</th>
                <th style={{ color: 'white' }}>{compid_list[14].CompID}</th>
                <th style={{ color: 'white' }}>{compid_list[14].Status}</th>
                <th style={{ color: 'white' }}>{compid_list[14].Port}</th>
              </tr>
            </tbody>
          </Table>
        </Col>
        <Col sm={3}>
          <Table>
            <thead>
              <tr>
                <th>CompID</th>
                <th>Status</th>
              </tr>
            </thead>
          </Table>
        </Col>
        <Col sm={3}>
          <Table>
            <thead>
              <tr>
                <th>CompID</th>
                <th>Status</th>
              </tr>
            </thead>
          </Table>
        </Col>
        <Col sm={3}>
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
      <Row>raw Message: {rawMsg}</Row>
      <Row>json Message: {originMsg}</Row>
      <Row>error Message: {errMsg}</Row>
    </div>
  );
};

export default Monitoring;
