import React, { Component } from 'react';
import { browserHistory } from 'react-router'
import { Col } from 'reactstrap';
import config from '../../config';
import './user.scss';

class User extends Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    this.props.getUser(this.props.params.name);
  }
  render = () => {
    return (
      <section className="user">
        <Col xs={{ size: 10, offset: 1}} id="information">
          <Col xs={{ size: 4}} id="logo">
          <img  className="img-thumbnail img-logo"
                height="150px"
                width="150px"
                src={this.props.user.avatar}/>
          </Col>
          <Col xs={{ size: 8}}>
            <Col>
              <span className="username">{this.props.user.rest_name}</span>
            </Col>
            <Col>
            <i className="fa fa-heart-o fa-lg" aria-hidden="true"/><span className="info">{this.props.user.likes}</span>
            <i className="fa fa-frown-o fa-lg" aria-hidden="true"/><span className="info">{this.props.user.dislikes}</span>
            </Col>
            <Col className="description">
              {this.props.user.address}
            </Col>
            <Col className="description">
              {this.props.user.description}
            </Col>
          </Col>
        </Col>
        <Col xs={{size: 10, offset: 1}} id="line">
          <hr/>
        </Col>
        <Col xs={{ size: 10, offset: 1}} id="images">
          { this.props.user.foods.map((elem, index) => {
            return (
              <Col xs={{ size: 4}} key={index} className="image" onClick={()=>{browserHistory.push(`/photo/${elem.uuid}`);}}>
                <img  className="img-thumbnail"
                      height="100%"
                      width="100%"
                      src={config.thumbnail + elem.uuid} />
              </Col>
            );
          })}
        </Col>
      </section>
    );
  }
}

User.propTypes = {
  params: React.PropTypes.object,
  user: React.PropTypes.object,
  getUser: React.PropTypes.func,
};

export default User;
