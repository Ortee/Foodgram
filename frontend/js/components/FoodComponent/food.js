import React, { Component } from 'react';
import { Button, Col, Container } from 'reactstrap';

class Food extends Component {
  constructor(props) {
    super(props);
    this.state = {
      heart:'fa fa-heart-o fa-lg food-like-icon',
      frown:'fa fa-meh-o fa-lg food-unlike-icon',
      trash:'fa fa-trash-o fa-lg food-remove-icon'
    }
  }

  heartOnEnter = () => {
    this.setState({
      heart:'fa fa-heart fa-lg food-like-icon color-icon',
    })
  }

  heartOnLeave = () => {
    this.setState({
      heart:'fa fa-heart-o fa-lg food-like-icon',
    })
  }

  trashOnEnter = () => {
    this.setState({
      trash:'fa fa-trash fa-lg food-remove-icon',
    })
  }

  trashOnLeave = () => {
    this.setState({
      trash:'fa fa-trash-o fa-lg food-remove-icon',
    })
  }

  faceOnEnter = () => {
    this.setState({
      frown:'fa fa-frown-o fa-lg food-unlike-icon color-icon'
    })
  }

  faceOnLeave = () => {
    this.setState({
      frown:'fa fa-meh-o fa-lg food-unlike-icon'
    })
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
          <img className="img-thumbnail" height="600px" width="538px" src="http://dfep0xlbws1ys.cloudfront.net/thumbs2d/dd/2ddd2a4753463c2f396777f0c85502e2.jpg"></img>
        </Col>
        <Col className="food-desciption">
          <p className="food-desciption-likes">#awesome #burger #tasty #foods</p>
          {this.props.post.content}
        </Col>
        <Col className="food-like">
          <hr/>
          <span className="food-like-text" onMouseEnter={this.heartOnEnter.bind()} onMouseLeave={this.heartOnLeave.bind()}>83</span>
          <i aria-hidden="true" className={this.state.heart} onMouseEnter={this.heartOnEnter.bind()} onMouseLeave={this.heartOnLeave.bind()}/>

          <i aria-hidden="true" className={this.state.frown} onMouseEnter={this.faceOnEnter.bind()} onMouseLeave={this.faceOnLeave.bind()}/>
          <span className="food-unlike-text" onMouseEnter={this.faceOnEnter.bind()} onMouseLeave={this.faceOnLeave.bind()}>13</span>

          <i  className={this.state.trash}
              onMouseEnter={this.trashOnEnter.bind()}
              onMouseLeave={this.trashOnLeave.bind()}
              aria-hidden="true"
              onClick={this.props.removePost.bind(null, this.props.post.name, this.props.i)}
          />
        </Col>
      </Col>
    );
  }
}

export default Food;
