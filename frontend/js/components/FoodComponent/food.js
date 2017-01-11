import React, { Component } from 'react';
import { Link } from 'react-router';
import { Col } from 'reactstrap';
import store from 'store';
import config from '../../config';

class Food extends Component {
  constructor(props) {
    super(props);
    this.state = {
      styles: {
        heart: 'fa-heart-o',
        frown: 'fa-meh-o',
        trash: 'fa-trash-o',
      },
      isLiked: false,
      isDisliked: false,
    };
    this.incrementLike = this.incrementLike.bind();
    this.incrementDislike = this.incrementDislike.bind();
  }

  _click = (uuid) => {
    this.props.getSingleFood(uuid);
  }

  componentDidMount = () => {
    if (store.get(this.props.food.uuid) === 'like') {
      this.setState({
        isLiked: true,
        isDisliked: false,
        styles: Object.assign(this.state.styles, {heart: 'fa-heart color-icon'}),
      });
    } else if (store.get(this.props.food.uuid) === 'dislike') {
      this.setState({
        isLiked: false,
        isDisliked: true,
        styles: Object.assign(this.state.styles, {frown: 'fa-frown-o color-icon'}),
      });
    }
  }

  renderRemoveIcon = () => {
    if (this.props.food.login === this.props.auth.login) {
      return (<i className={'fa-lg food-remove-icon fa ' + this.state.styles.trash}
        onMouseEnter={this.trashOnEnter.bind()}
        onMouseLeave={this.trashOnLeave.bind()}
        aria-hidden="true"
        onClick={this.props.removeFood.bind(null, this.props.food.uuid, this.props.i, this.props.auth.token)}/>);
    }
  }

  render() {
    return (
      <Col className="food-container">
        <Col className="food-title">
          <i className="fa fa-cutlery" aria-hidden="true" />
          <span className="food-title-text">
            <Link style={{ textDecoration: 'none', color: '#373a3c' }}
                  to={`/user/${this.props.food.login.toLowerCase()}`}>
                    {this.props.food.username}
            </Link>
          </span>
        </Col>
        <Col className="food-photo">
          <Link onClick={this._click.bind(this, this.props.food.uuid)} to={`/photo/${this.props.food.uuid}`}>
            <img  className="img-thumbnail"
                  height="600px"
                  width="538px"
                  src={config.image + this.props.food.uuid + '?type=fullsize'} />
          </Link>
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
                onClick={this.incrementLike}>
                {this.props.food.likes}
          </span>
          <i  aria-hidden="true"
              className={'fa-lg food-like-icon fa ' + this.state.styles.heart}
              onMouseEnter={this.heartOnEnter.bind()}
              onMouseLeave={this.heartOnLeave.bind()}
              onClick={this.incrementLike}/>
          <i  aria-hidden="true"
              className={'fa-lg food-unlike-icon fa ' + this.state.styles.frown}
              onMouseEnter={this.faceOnEnter.bind()}
              onMouseLeave={this.faceOnLeave.bind()}
              onClick={this.incrementDislike}/>
          <span className="food-unlike-text"
                onMouseEnter={this.faceOnEnter.bind()}
                onMouseLeave={this.faceOnLeave.bind()}
                onClick={this.incrementDislike}>
                {this.props.food.dislikes}
          </span>
          {this.renderRemoveIcon()}
        </Col>
      </Col>
    );
  }

  heartOnEnter = () => {
    if (!this.state.isLiked) {
      this.setState({
        styles: Object.assign(this.state.styles, {heart: 'fa-heart color-icon'}),
      });
    }
  }

  heartOnLeave = () => {
    if (!this.state.isLiked) {
      this.setState({
        styles: Object.assign(this.state.styles, {heart: 'fa-heart-o'}),
      });
    }
  }

  faceOnEnter = () => {
    if (!this.state.isDisliked) {
      this.setState({
        styles: Object.assign(this.state.styles, {frown: 'fa-frown-o color-icon'}),
      });
    }
  }

  faceOnLeave = () => {
    if (!this.state.isDisliked) {
      this.setState({
        styles: Object.assign(this.state.styles, {frown: 'fa-meh-o'}),
      });
    }
  }

  trashOnEnter = () => {
    this.setState({
      styles: Object.assign(this.state.styles, {trash: 'fa-trash'}),
    });
  }

  trashOnLeave = () => {
    this.setState({
      styles: Object.assign(this.state.styles, {trash: 'fa-trash-o'}),
    });
  }

  incrementLike = () => {
    this.setState({
      isLiked: true,
      isDisliked: false,
      styles: Object.assign(this.state.styles, {
        heart: 'fa-heart color-icon',
        frown: 'fa-meh-o',
      }),
    });
    if (!this.state.isLiked && this.state.isDisliked) {
      this.props.incrementLike(this.props.food.uuid, this.props.i);
      this.props.decrementDislike(this.props.food.uuid, this.props.i);
    } else if (!this.state.isLiked) {
      this.props.incrementLike(this.props.food.uuid, this.props.i);
    }
  }

  incrementDislike = () => {
    this.setState({
      isLiked: false,
      isDisliked: true,
      styles: Object.assign(this.state.styles, {
        frown: 'fa-frown-o color-icon',
        heart: 'fa-heart-o',
      }),
    });
    if (!this.state.isDisliked && this.state.isLiked) {
      this.props.incrementDislike(this.props.food.uuid, this.props.i);
      this.props.decrementLike(this.props.food.uuid, this.props.i);
    } else if (!this.state.isDisliked) {
      this.props.incrementDislike(this.props.food.uuid, this.props.i);
    }
  }
}

Food.propTypes =  {
  incrementLike: React.PropTypes.func,
  decrementLike: React.PropTypes.func,
  incrementDislike: React.PropTypes.func,
  decrementDislike: React.PropTypes.func,
  food: React.PropTypes.object,
  auth: React.PropTypes.object,
  i: React.PropTypes.number,
  removeFood: React.PropTypes.func,
  getSingleFood: React.PropTypes.func,
};

export default Food;
