import React, { Component, PropTypes } from 'react';
import { Router, Route, Link , browserHistory } from 'react-router';
import { Button, Form, FormGroup, Label, Table, Col, Alert } from 'reactstrap';
import Food from './food';
import './food.scss';

class Foods extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount(){
    this.props.showFoods();
  }

  handleSubmit(e) {
    e.preventDefault();
    const username = this.refs.username.value;
    const description = this.refs.description.value;
    const hashtags = this.refs.hashtags.value;
    const photo = this.refs.photo.value;
    console.log(username, description, hashtags, photo);
    this.props.addFood(username, description, hashtags, photo);
    // this.refs.commentForm.reset();
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
        <Col xs={{size:6, offset: 3}} className="addPost-form">
          <form ref="commentForm" onSubmit={this.handleSubmit} class="form-inline">
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
}

export default Foods;
