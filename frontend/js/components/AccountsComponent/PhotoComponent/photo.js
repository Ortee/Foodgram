import React, { Component } from 'react';
import { Col, Label, Button } from 'reactstrap';
import './photo.scss';

class Photo extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
  }
  render = () => {
    return (
      <article className="photo">
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
      </article>
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

Photo.propTypes = {
  addFood: React.PropTypes.func,
};

export default Photo;
