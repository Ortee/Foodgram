import React, { Component } from 'react';
import { Col } from 'reactstrap';
import './edit.scss';

class Edit extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
  }
  render = () => {
    return (
      <article className="edit">
        <Col>
          Edit
        </Col>
      </article>
    );
  }
}

Edit.propTypes = {
};

export default Edit;
