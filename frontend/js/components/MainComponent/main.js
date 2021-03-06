import React, { Component } from 'react';
import { Container, Row } from 'reactstrap';
import store from 'store';

import Menu from '../MenuComponent/menu';
import './main.scss';

class Main extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount = () => {
    this.checkAuth(this.props.auth.isAuthenticated);
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

  checkAuth = (isAuthenticated) => {
    if (store.get('token') !== undefined && !isAuthenticated) {
      this.props.loginUserSuccess(store.get('token'));
    }
  }
}

Main.propTypes =  {
  children: React.PropTypes.element,
  auth: React.PropTypes.object,
  loginUserSuccess: React.PropTypes.func,
};

export default Main;
