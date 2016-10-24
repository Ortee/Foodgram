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
    this.props.showPosts();
  }

  handleSubmit(e) {
    e.preventDefault();
    const name = this.refs.name.value;
    const content = this.refs.content.value;
    this.props.addPost(name, content);
    this.refs.commentForm.reset();
  }

  render() {
    return (
      <section>
      <Col xs={{size: 6, offset: 3}}>
        {this.props.posts.map((post, i) =>
          <Food {...this.props}
            key={i}
            i={i}
            post={post}
          />)}
        </Col>
        <Col xs={{size:6, offset: 3}} className="addPost-form">
          <form ref="commentForm" onSubmit={this.handleSubmit} class="form-inline">
              <Label hidden>Name</Label>
              <input type="text" ref="name" placeholder="name" className="form-control addPost-input"/>
              <Label hidden>Content</Label>
              <input type="text" ref="content" placeholder="content" className="form-control addPost-input"/>
            <Button type="submit" color="success" className="addPost-button">Submit</Button>
          </form>
        </Col>
      </section>
    );
  }
}

export default Foods;
