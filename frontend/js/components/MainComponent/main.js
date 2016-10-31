import React, { Component, PropTypes } from 'react';
import { Router, Route, Link , browserHistory } from 'react-router';
import { Container, Row } from 'reactstrap';

import Menu from '../MenuComponent/menu';
import Alerts from '../AlertsComponent/alerts';
import './main.scss';

class Main extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <section>
        <Menu />
        <Container>
          <Row>
            <Alerts {...this.props} />
            <section className="content">
              {React.cloneElement(this.props.children, this.props)}
            </section>
          </Row>
        </Container>
      </section>
    );
  }
}

Main.propTypes =  {
  children: React.PropTypes.element,
};

export default Main;
