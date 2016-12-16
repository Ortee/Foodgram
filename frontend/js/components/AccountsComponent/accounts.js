import React, { Component } from 'react';
import { Link } from 'react-router';
import { Col } from 'reactstrap';
import './accounts.scss';

class Accounts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photo: 'active',
      edit: '',
      password: '',
    };
  }
  componentDidMount() {
    this.props.getUser(this.props.auth.login);
  }
  render = () => {
    return (
      <section className="accounts">
        <Col>
          <Col xs={{size: 12}} lg={{size: 10, offset: 1}} id="main">
            <Col xs={{size: 3}} id="menu">
              <ul>
                <Link style={{ textDecoration: 'none' }} to={'/accounts/photo'} onClick={this.changeActive.bind(null, 'photo')}>
                  <li className={this.state.photo}>Add photo</li>
                </Link>
                <Link style={{ textDecoration: 'none' }} to={'/accounts/edit'} onClick={this.changeActive.bind(null, 'edit')}>
                  <li className={this.state.edit}>Edit profile</li>
                </Link>
                <Link style={{ textDecoration: 'none' }} to={'/accounts/password'} onClick={this.changeActive.bind(null, 'password')}>
                  <li className={this.state.password}>Change password</li>
                </Link>
                <Link style={{ textDecoration: 'none', cursor: 'pointer' }} onClick={this.props.logout.bind()}>
                  <li>Logout</li>
                </Link>
              </ul>
            </Col>
            <Col xs={{size: 9}} id="content">
              { React.cloneElement(this.props.children.props.children, this.props) }
            </Col>
          </Col>
        </Col>
      </section>
    );
  }
  changeActive = (name) => {
    this.setState({
      photo: '',
      edit: '',
      password: '',
    });
    if (name === 'photo') {
      this.setState({photo: 'active'});
    } else if (name === 'edit') {
      this.setState({edit: 'active'});
    } else if (name === 'password') {
      this.setState({password: 'active'});
    }
  }
}

Accounts.propTypes = {
  auth: React.PropTypes.object,
  children: React.PropTypes.element.isRequired,
  logout: React.PropTypes.func,
  getUser: React.PropTypes.func,
};

export default Accounts;
