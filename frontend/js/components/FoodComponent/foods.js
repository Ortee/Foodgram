import React, { Component } from 'react';
import { Button, Label, Col } from 'reactstrap';
import Food from './food';
import './food.scss';

class Foods extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.showFoods();
  }

  render() {
    return (
      <section>
      <Col xs={{size: 12}} md={{size: 8, offset: 2}} lg={{size: 6, offset: 3}}>
        {this.props.foods.map((food, i) =>
          <Food {...this.props}
            key={i}
            i={i}
            food={food}
          />)}
        </Col>
        <Col xs={{size: 6, offset: 3}} className="addPost-form">
          <form ref="commentForm" onSubmit={this.handleSubmit} className="form-inline">
            <Label hidden>Username</Label>
            <input type="text" ref="username" placeholder="username" className="form-control addPost-input"/>
            <Label hidden>Description</Label>
            <input type="text" ref="description" placeholder="description" className="form-control addPost-input"/>
            <Label hidden>HashTags</Label>
            <input type="text" ref="hashtags" placeholder="hashtags" className="form-control addPost-input"/>
            <Label hidden>URL IMG</Label>
            <input type="text" ref="photo" placeholder="photo" className="form-control addPost-input"/>
            <Button type="submit" color="success" className="addPost-button">Submit</Button>
          </form>
        </Col>
      </section>
    );
  }

  handleSubmit(e) {
    e.preventDefault();
    const username = this.refs.username.value;
    const description = this.refs.description.value;
    const hashtags = this.refs.hashtags.value;
    const photo = this.refs.photo.value;
    this.props.addFood(username, description, hashtags, photo);
    this.refs.commentForm.reset();
  }
}

Foods.propTypes =  {
  addFood: React.PropTypes.func,
  showFoods: React.PropTypes.func,
  foods: React.PropTypes.array,
};

export default Foods;
