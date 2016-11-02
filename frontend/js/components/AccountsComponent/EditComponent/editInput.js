import React, { Component } from 'react';
import { Col, Label } from 'reactstrap';

class EditInput extends Component {
  constructor(props) {
    super(props);
  }
  render = () =>{
    return (
      <section className="editInput">
        <Col xs={{ size: 4}} className="input-text">
          <Label>{this.props.text}</Label>
        </Col>
        <Col xs={{ size: 8}}>
          <input  type={this.props.type}
                  ref={this.props.refer}
                  placeholder={this.props.placeholder}
                  className="form-control auth-input"
          />
        </Col>
      </section>
    );
  };
}

EditInput.propTypes = {
  type: React.PropTypes.string,
  placeholder: React.PropTypes.string,
  refer: React.PropTypes.string,
  text: React.PropTypes.string,
};

export default EditInput;
