// @flow

import * as React from 'react';
import { NavLink, withRouter } from 'react-router-dom';

import {
  Site,
  Nav,
  Grid,
  List,
  Button,
  RouterContextProvider,
} from 'tabler-react';

const navBarItems: Array<navItem> = [
  {
    value: 'Home',
    to: '/Home',
    // icon: 'home',
    LinkComponent: withRouter(NavLink),
    useExact: true,
  },
  {
    value: 'nextSTPHUB 모니터링',
    to: '/stphubmonitor',
    LinkComponent: withRouter(NavLink),
    useExact: true,
  },
  {
    value: '통합 모니터링(현물)',
    to: '/monitoring_ndstk',
    LinkComponent: withRouter(NavLink),
    useExact: true,
  },
  {
    value: '통합 모니터링(선물)',
    to: '/monitoring_ndfo',
    LinkComponent: withRouter(NavLink),
    useExact: true,
  },
  {
    value: '서버 Ip & Port 셋팅',
    to: '/connectInfo',
    // icon: 'home',
    LinkComponent: withRouter(NavLink),
    useExact: true,
  },
  {
    value: '네트워크테스트',
    to: '/networktest',
    // icon: 'home',
    LinkComponent: withRouter(NavLink),
    useExact: true,
  },
];

class SiteWrapper extends React.Component<Props, State> {
  state = {};

  render(): React.Node {
    return (
      <Site.Wrapper
        headerProps={{
          href: '#/Home',
          alt: 'FEP Monitoring Client',
          imageURL: './img/koscom_ci_big.jpg',
          navItems: <h3>nextSTPHUB</h3>,
        }}
        navProps={{ itemsObjects: navBarItems }}
        routerContextComponentType={withRouter(RouterContextProvider)}
        footerProps={{
          copyright: (
            <>
              Copyright © 2021
              <a href="."> nextSTPHUB. </a>
              All rights reserved.
            </>
          ),
          nav: (
            <>
              <Grid.Col auto={true}>
                <List className="list-inline list-inline-dots mb-0">
                  <List.Item className="list-inline-item">
                    <a href="./docs/index.html">Documentation</a>
                  </List.Item>
                  <List.Item className="list-inline-item">
                    <a href="./faq.html">FAQ</a>
                  </List.Item>
                </List>
              </Grid.Col>
              <Grid.Col auto={true}></Grid.Col>
            </>
          ),
        }}
      >
        {this.props.children}
      </Site.Wrapper>
    );
  }
}

export default SiteWrapper;
