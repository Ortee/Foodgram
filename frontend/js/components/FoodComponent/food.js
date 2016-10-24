import React, { Component } from 'react';
import { Button, Col, Container } from 'reactstrap';

class Food extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <Col className="food-container">
        <Col className="food-title">
          <i className="fa fa-cutlery" aria-hidden="true" />
          <span className="food-title-text">
            {this.props.post.name}
          </span>
        </Col>
        <Col className="food-photo">
          <img height="600px" width="538px" src="http://dfep0xlbws1ys.cloudfront.net/thumbs2d/dd/2ddd2a4753463c2f396777f0c85502e2.jpg"></img>
        </Col>
        <Col className="food-desciption">
          <p className="food-desciption-likes">#awesome #burger #tasty #foods</p>
          {this.props.post.content}
        </Col>
        <Col className="food-like">
          <hr/>
          <span className="food-like-text">83</span>
          <i aria-hidden="true" className="fa fa-heart-o fa-lg food-like-icon"/>
          <i aria-hidden="true" className="fa fa-frown-o fa-lg food-unlike-icon"/>
          <span className="food-unlike-text">13</span>
          <i className="fa fa-trash-o fa-lg food-remove-icon" aria-hidden="true" onClick={this.props.removePost.bind(null, this.props.post.name, this.props.i)}/>
        </Col>
      </Col>
    );
  }
}

export default Food;
