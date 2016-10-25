import React, { Component, PropTypes } from 'react';
import { Router, Route, Link , browserHistory } from 'react-router';
import { Container, Row } from 'reactstrap';

import Menu from '../MenuComponent/menu';
import Alerts from '../AlertsComponent/alerts';
import './main.scss';

class Main extends Component {
  constructor(props){
    super(props)
  }

  render() {
    return (
      <section className="main-container">
        <Container>
          <Row style={{maxWidth:'100%'}}>
            <Alerts {...this.props} />
            <Menu />
            <section className="content">
              {React.cloneElement(this.props.children, this.props)}
            </section>
          </Row>
        </Container>
      </section>
    );
  }
}

export default Main;
