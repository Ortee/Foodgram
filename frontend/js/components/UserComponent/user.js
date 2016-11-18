import React, { Component } from 'react';
import { browserHistory } from 'react-router'
import { Col } from 'reactstrap';
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
            <i className="fa fa-heart-o fa-lg" aria-hidden="true"/><span className="info">50</span>
            <i className="fa fa-frown-o fa-lg" aria-hidden="true"/><span className="info">20</span>
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
                      src="https://static1.squarespace.com/static/55355f2fe4b0bb1e28857a4c/56991220fb36b1a2d2c69b9a/56991220a976afc919db1f65/1452872520958/MealPlans.png?format=300w"/>
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
