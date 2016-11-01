import React, { Component } from 'react';
import { Container, Row } from 'reactstrap';

import Menu from '../MenuComponent/menu';
import './main.scss';

class Main extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <section>
        <Menu {...this.props}/>
        <Container>
          <Row>
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
