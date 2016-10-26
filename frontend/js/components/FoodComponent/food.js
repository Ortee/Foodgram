import React, { Component } from 'react';
import { Col } from 'reactstrap';

class Food extends Component {
  constructor(props) {
    super(props);
    this.state = {
      heart:'fa-heart-o',
      frown:'',
      trash:'fa-trash-o'
    }
  }

  heartOnEnter = () => {
    this.setState({
      heart:'fa-heart color-icon',
    })
  }

  heartOnLeave = () => {
    this.setState({
      heart:'fa-heart-o',
    })
  }

  trashOnEnter = () => {
    this.setState({
      trash:'fa-trash',
    })
  }

  trashOnLeave = () => {
    this.setState({
      trash:'fa-trash-o',
    })
  }

  faceOnEnter = () => {
    this.setState({
      frown:'color-icon'
    })
  }

  faceOnLeave = () => {
    this.setState({
      frown:''
    })
  }

  render() {
    return(
      <Col className="food-container">
        <Col className="food-title">
          <i className="fa fa-cutlery" aria-hidden="true" />
          <span className="food-title-text">
            {this.props.food.username}
          </span>
        </Col>
        <Col className="food-photo">
          <img  className="img-thumbnail"
                height="600px"
                width="538px"
                src={this.props.food.photo}>
          </img>
        </Col>
        <Col className="food-desciption">
          <p className="food-desciption-likes">{this.props.food.hashtags}</p>
          {this.props.food.description}
        </Col>
        <Col className="food-like">
          <hr/>
          <span className="food-like-text"
                onMouseEnter={this.heartOnEnter.bind()}
                onMouseLeave={this.heartOnLeave.bind()}
                onClick={this.props.incrementLike.bind(null, this.props.food.uuid, this.props.i)}>
                {this.props.food.likes}
          </span>
          <i  aria-hidden="true"
              className={'fa-lg food-like-icon fa ' + this.state.heart}
              onMouseEnter={this.heartOnEnter.bind()}
              onMouseLeave={this.heartOnLeave.bind()}
              onClick={this.props.incrementLike.bind(null, this.props.food.uuid, this.props.i)}/>
          <i  aria-hidden="true"
              className={'fa fa-meh-o fa-lg food-unlike-icon '+this.state.frown}
              onMouseEnter={this.faceOnEnter.bind()}
              onMouseLeave={this.faceOnLeave.bind()}
              onClick={this.props.incrementDislike.bind(null, this.props.food.uuid, this.props.i)}/>
          <span className="food-unlike-text"
                onMouseEnter={this.faceOnEnter.bind()}
                onMouseLeave={this.faceOnLeave.bind()}
                onClick={this.props.incrementDislike.bind(null, this.props.food.uuid, this.props.i)}>
                {this.props.food.dislikes}
          </span>
          <i  className={'fa-lg food-remove-icon fa ' + this.state.trash}
              onMouseEnter={this.trashOnEnter.bind()}
              onMouseLeave={this.trashOnLeave.bind()}
              aria-hidden="true"
              onClick={this.props.removeFood.bind(null, this.props.food.uuid, this.props.i)}/>
        </Col>
      </Col>
    );
  }
}

export default Food;
