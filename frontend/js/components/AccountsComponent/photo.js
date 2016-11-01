import React, { Component } from 'react';
import { Col } from 'reactstrap';
import './photo.scss';

class Photo extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
  }
  render = () => {
    return (
      <article className="photo">
        <Col>
          Photo
        </Col>
      </article>
    );
  }
}

Photo.propTypes = {
};

export default Photo;
